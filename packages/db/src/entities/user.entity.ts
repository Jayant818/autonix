import { Unique } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  password: string;
}
