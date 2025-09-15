import { OneToMany, Unique } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Credentials } from "./Credentials.entity";
import { Workflow } from "./Workflow.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Credentials, (cred) => cred.user)
  credentials: Credentials[];

  @OneToMany(() => Workflow, (workflow) => workflow.user)
  workflows: Workflow[];
}
