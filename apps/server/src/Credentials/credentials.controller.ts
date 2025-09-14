import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialsDTO } from './DTO/create-credentials.dto';

@Controller('/api/v1/credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get()
  async getCredentials(@Request() req) {
    const id = req.user.id;
    return this.credentialsService.getCredentials(id);
  }

  @Get('/:id')
  async getCredentialsById(@Param('id') id: number) {
    return this.credentialsService.getCredentialsById(id);
  }

  @Post()
  async createCredentials(@Body() data: CreateCredentialsDTO) {
    return this.credentialsService.createCredentials(data);
  }

  @Delete()
  async deleteCredentials(@Body() { id }: { id: number }) {
    return this.credentialsService.deleteCredentials(id);
  }
}
