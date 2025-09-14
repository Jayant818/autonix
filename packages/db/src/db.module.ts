import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Credentials } from "./entities/Credentials.entity";
import { Execution } from "./entities/Execution.entity";
import { Webhook } from "./entities/Webhook.entity";
import { Workflow } from "./entities/Workflow.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + "/entities/*.entity{.ts,.js}"],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Credentials, Execution, Webhook, Workflow]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DbModule {}
