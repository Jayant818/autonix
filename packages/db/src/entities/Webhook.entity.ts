import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./Workflow.entity";

export enum WEBHOOK_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  secret: string;

  @Column({
    type: "enum",
    enum: WEBHOOK_METHODS,
  })
  method: WEBHOOK_METHODS;

  @ManyToOne(() => Workflow, (workflow) => workflow.webhooks, {
    onDelete: "CASCADE",
  })
  workflow: Workflow;
}
