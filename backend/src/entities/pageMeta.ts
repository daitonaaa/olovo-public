import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Page } from './page';

export enum PageMetaType {
  Title = 1,
  Description = 2,
  OgTitle = 3,
  OgDesc = 4,
  OgImageSource = 5,
}

@Entity()
export class PageMeta extends EntityBase {
  @Column({ type: 'int' })
  public role: PageMetaType;

  @Column({ type: 'text', name: 'value', nullable: false })
  public value: string;

  @ManyToOne(() => Page, (x) => x.pageMeta)
  page: Page;
}
