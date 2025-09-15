import { Injectable } from '@nestjs/common';
import { createWorkflowDTO } from './DTO/create-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TriggerType, Workflow } from '@repo/db/src/entities/Workflow.entity';
import { Repository } from 'typeorm';
import { Webhook } from '@repo/db/src/entities/Webhook.entity';
import { Execution } from '@repo/db/src/entities/Execution.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,
    @InjectRepository(Execution)
    private readonly executionRepository: Repository<Execution>,
  ) {}

  async getWorkflows() {}

  async getWorkflowsById(id: string) {}

  async createWorkflow({
    userId,
    body,
  }: {
    userId: string;
    body: createWorkflowDTO;
  }) {
    try {
      const workflow = this.workflowRepository.create({
        name: body.name,
        description: body.description || '',
        nodes: body.nodes,
        connections: body.connections,
        trigger: body.trigger,
        enabled: body.enabled !== undefined ? body.enabled : true,
      });

      if (body.trigger === TriggerType.Webhook && body.webhook) {
        const webhook = this.webhookRepository.create({
          title: body.webhook?.title,
          method: body.webhook.method,
          secret: body.webhook.secret,
          endpoint: body.webhook.endpoint,
          workflow,
        });
      }
    } catch (err: any) {
      console.error('Error creating workflow:', err);
    }
  }

  async updateWorkflowById(id: string) {}

  async deleteWorkflowById(id: string) {}

  async runWorkflowById(id: string) {}
}
