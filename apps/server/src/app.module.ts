import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WorkflowModule } from './Workflow/workflow.module';
import { CredentialsModule } from './Credentials/credentials.module';
import { DbModule } from '@repo/db/src/db.module';
import { JWTAuthGuard } from './Auth/Guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule, WorkflowModule, CredentialsModule, DbModule],
  controllers: [],
  providers: [
    {
      // This is a special token that tell nestjs to use tis guard globally
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
