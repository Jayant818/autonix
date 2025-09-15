import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Execution } from "./Execution.entity";
import { Webhook } from "./Webhook.entity";
import { User } from "./user.entity";

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
  nodes: Record<string, any>;

  @Column({
    type: "json",
  })
  connections: Record<string, any>[];

  @OneToMany(() => Execution, (execution) => execution.workflow)
  executions: Execution[];

  @OneToMany(() => Webhook, (webhook) => webhook.workflow)
  webhooks: Webhook[];

  @ManyToOne(() => User, (user) => user.workflows, { onDelete: "CASCADE" })
  user: User;

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
