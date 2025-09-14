import { OneToMany, Unique } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Credentials } from "./Credentials.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Credentials, (cred) => cred.user)
  credentials: Credentials[];
}
