import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowService {
  constructor() {}

  async getWorkflows() {}

  async getWorkflowsById(id: string) {}

  async createWorkflow() {}

  async updateWorkflowById(id: string) {}
}
