import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBody } from '@nestjs/swagger';
import { ComponentRequest } from './dto/componentRequest';
import { Component } from 'src/entities/component';
import { EnableAuth } from '../../../common/auth/auth.decorators';
import { Repository } from 'typeorm';
import { ComponentService } from './component.service';

@Controller()
@ApiTags('Component')
export class ComponentController {
  @InjectRepository(Component) componentRepository: Repository<Component>;

  constructor(private readonly componentService: ComponentService) {}

  @Get()
  @EnableAuth({ admin: true })
  all() {
    return this.componentRepository.find({ relations: ['componentTemplate'] });
  }

  @Get(':id')
  @EnableAuth({ admin: true })
  async findOne(@Param('id') id: number) {
    const existPage = await this.componentRepository.findOne({
      where: { id: id },
      relations: ['componentTemplate'],
    });

    if (existPage == null) throw new NotFoundException('компонент не найден');
    return existPage;
  }

  @Post()
  @ApiBody({ type: ComponentRequest })
  @EnableAuth({ admin: true })
  async create(@Body() componentRequest: ComponentRequest) {
    if (!componentRequest.id) {
      await this.componentService.createComponent(componentRequest);
    } else {
      await this.componentService.updateComponent(componentRequest);
    }
  }
}
