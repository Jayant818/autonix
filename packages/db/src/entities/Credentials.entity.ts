import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({
    type: "enum",
    enum: PLATFORMSUPPORTED,
  })
  platform: PLATFORMSUPPORTED;

  @ManyToOne(() => User, (user) => user.credentials, { onDelete: "CASCADE" })
  user: User;

  @Column({
    type: "json",
  })
  data: Record<string, any>;
}
