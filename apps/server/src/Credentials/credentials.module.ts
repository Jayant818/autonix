import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [],
  controllers: [CredentialsController],
  providers: [CredentialsService],
  exports: [],
})
export class CredentialsModule {}
