import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum PLATFORMSUPPORTED {
  TELEGRAM = "TELEGRAM",
  RESEND = "RESEND",
  OPENAI = "OPENAI",
  GEMINI = "GEMINI",
}

@Entity()
export class Credentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  platform: PLATFORMSUPPORTED;

  @Column()
  userId: User;

  @Column()
  key: any;
}
