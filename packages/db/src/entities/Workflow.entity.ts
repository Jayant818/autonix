import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Execution } from "./Execution.entity";
import { Webhook } from "./Webhook.entity";

export enum TriggerType {
  Webhook = "webhook",
  Manual = "manual",
  Cron = "cron",
}

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column({
    type: "enum",
    enum: TriggerType,
  })
  trigger: TriggerType;

  @Column({
    type: "json",
  })
  nodes: Record<string, any>[];

  @Column({
    type: "json",
  })
  connections: Record<string, any>;

  @OneToMany(() => Execution, (execution) => execution.workflow)
  executions: Execution[];

  @OneToMany(() => Webhook, (webhook) => webhook.workflow)
  webhooks: Webhook[];

  @Column({
    nullable: true,
    default: "",
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
