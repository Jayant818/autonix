import { Controller, Delete, Post } from '@nestjs/common';
import { CredentialsService } from './credentials.service';

@Controller('/api/v1/credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async createCredentials() {
    return this.credentialsService.createCredentials();
  }

  @Delete()
  async deleteCredentials() {
    return this.credentialsService.deleteCredentials();
  }
}
