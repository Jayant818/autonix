import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('/api/v1/workflow')
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    s,
  ) {}

  @Get()
  async getWorkflows() {
    const workflow = await this.workflowService.getWorkflows();
    return workflow;
  }

  @Get('/id')
  async getWorkflowById(@Param('id') id: string) {
    return this.workflowService.getWorkflowsById(id);
  }

  @Post()
  async createWorkflow() {
    return this.workflowService.createWorkflow();
  }

  @Put('/id')
  async updateWorkflowById(@Param('id') id: string) {
    return this.workflowService.updateWorkflowById(id);
  }
}
