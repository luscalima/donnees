import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('projects')
export class ProjectModel {
  @PrimaryColumn('uuid')
  id: string

  @Column('uuid')
  userId: string

  @Column('varchar', { length: 255 })
  name: string

  @Column('text', { nullable: true })
  description: string

  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date
}
