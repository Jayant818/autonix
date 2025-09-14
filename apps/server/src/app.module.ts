import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WorkflowModule } from './Workflow/workflow.module';
import { CredentialsModule } from './Credentials/credentials.module';

@Module({
  imports: [UserModule, WorkflowModule, CredentialsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
