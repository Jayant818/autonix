import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workflow } from "./Workflow.entity";

export enum WORKFLOW_STATUS {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

@Entity()
export class Execution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workflow, (workflow) => workflow.executions, {
    onDelete: "CASCADE",
  })
  workflow: Workflow;

  @Column({
    type: "enum",
    enum: WORKFLOW_STATUS,
    default: WORKFLOW_STATUS.PENDING,
  })
  status: WORKFLOW_STATUS;

  @Column({
    type: "int",
    nullable: false,
  })
  totalTasks: number;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  completedTasks: number;

  @Column({
    type: "json",
    nullable: true,
  })
  result: Record<string, any>;

  @Column({
    type: "json",
    nullable: true,
  })
  logs: Record<string, any>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
