import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  workflowId: number;

  @Column()
  status: WORKFLOW_STATUS;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  result: JSON; // It will be a JSON
}

export class TaskLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ExecutionId: number;

  @Column()
  taskId: number;

  @Column()
  log: string[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
