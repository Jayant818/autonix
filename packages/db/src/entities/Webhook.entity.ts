import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum WEBHOOK_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  secret: string;

  @Column()
  method: WEBHOOK_METHODS;

  @Column()
  workflowId: number;
}
