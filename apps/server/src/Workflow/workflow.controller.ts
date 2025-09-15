import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { createWorkflowDTO } from './DTO/create-workflow.dto';

@Controller('/api/v1/workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get()
  async getWorkflows(@Req() req) {
    const { id: userId } = req.user;
    const workflow = await this.workflowService.getWorkflows({ userId });
    return workflow;
  }

  @Get('/:id')
  async getWorkflowById(@Req() req, @Param('id') id: string) {
    const { id: userId } = req.user;
    if (!userId) {
      throw new Error('User not logged in');
    }
    return this.workflowService.getWorkflowsById(id);
  }

  @Post('/manual/:id')
  async triggerManualWorkflow(@Req() req, @Param('id') id: string) {
    const { id: userId } = req.user;
    if (!userId) {
      throw new Error('User not logged in');
    }
    // Logic to trigger the workflow manually
    return this.workflowService.runWorkflowById({ workflowId: id, userId });
  }

  /*
   * When creating workflow, we will save all the nodes and the webhooks associated with it.
   */
  @Post()
  async createWorkflow(@Req() req, @Body() body: createWorkflowDTO) {
    const { id } = req.user;
    return this.workflowService.createWorkflow({ userId: id, body });
  }

  @Put('/:id')
  async updateWorkflowById(
    @Param('id') id: string,
    @Body() body: createWorkflowDTO,
  ) {
    return this.workflowService.updateWorkflowById({ id, body });
  }

  @Delete('/:id')
  async deleteWorkflowById(@Param('id') id: string) {
    return this.workflowService.deleteWorkflowById(id);
  }
}
