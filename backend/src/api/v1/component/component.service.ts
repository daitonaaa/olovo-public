import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Component } from '../../../entities/component';
import { ComponentTemplate } from '../../../entities/componentTemplate';
import { ComponentRequest } from './dto/componentRequest';
import { PageNode } from '../../../entities/pageNode';
import { NodeParam } from '../../../entities/nodeParam';

@Injectable()
export class ComponentService {
  @InjectEntityManager() entityManager: EntityManager;

  async createComponent(requestModel: ComponentRequest): Promise<Component> {
    return await this.entityManager.transaction(async (tem) => {
      const component = new Component();
      component.name = requestModel.name;
      component.label = requestModel.label;
      await tem.save(component);

      const templates = requestModel.componentTemplate.map((x) => {
        const template = new ComponentTemplate();
        template.component = component;
        template.componentType = x;
        return template;
      });

      await tem.save(templates);
      return component;
    });
  }

  async updateComponent(requestModel: ComponentRequest) {
    await this.entityManager.transaction(async (tem) => {
      const existComponent = await tem.getRepository(Component).findOne({
        where: { id: requestModel.id },
        relations: ['componentTemplate'],
      });
      if (!existComponent) throw new NotFoundException('компонент не найден');

      existComponent.label = requestModel.label;
      await tem.save(existComponent);

      const existCompTemplate = existComponent.componentTemplate.map((x) => {
        return x.componentType;
      });
      const newComponentTemplate = requestModel.componentTemplate.filter(
        function (el) {
          return existCompTemplate.indexOf(el) < 0;
        },
      );

      const toDrop = existComponent.componentTemplate.filter(
        (ct) => !requestModel.componentTemplate.includes(ct.componentType),
      );

      await this.entityManager
        .getRepository(ComponentTemplate)
        .delete({ id: In(toDrop.map((i) => i.id)) });

      const templates = newComponentTemplate.map((x) => {
        const template = new ComponentTemplate();
        template.component = existComponent;
        template.componentType = x;
        return template;
      });

      await tem.save(templates);

      const pageNodes = await tem.getRepository(PageNode).find({
        where: { componentId: existComponent.id },
        relations: ['page'],
      });

      await Promise.all(
        pageNodes.map(async (node) => {
          const nodesParam: NodeParam[] = newComponentTemplate.map((x) => {
            const nodeParam = new NodeParam();
            nodeParam.componentType = x;
            nodeParam.value = '';
            nodeParam.pageNode = node;
            nodeParam.page = node.page;
            return nodeParam;
          });

          await tem.save(nodesParam);
        }),
      );
    });
  }
}
