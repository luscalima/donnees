import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./Project";

export enum ModelType {
  ERD = "erd",
  RELATIONAL = "relational",
}

@Entity("models")
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("enum", { enum: ModelType, default: ModelType.ERD })
  type: string;

  @Column("json", { nullable: true })
  data: any;

  @ManyToOne(() => Project, (project) => project.models)
  project: Project;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
