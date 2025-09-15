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

  async getWorkflows({ userId }: { userId: string }) {
    return this.workflowRepository.findOne({
      where: {
        user: { id: Number(userId) },
      },
      relations: ['webhooks', 'executions'],
    });
  }

  async getWorkflowsById(id: string) {
    const workflow = await this.workflowRepository.findOne({
      where: { id: Number(id) },
      relations: ['webhooks', 'executions'],
    });

    return workflow;
  }

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

  async updateWorkflowById({
    id,
    body,
  }: {
    id: string;
    body: createWorkflowDTO;
  }) {
    const workflow = await this.workflowRepository.findOne({
      where: { id: Number(id) },
    });
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    Object.assign(workflow, {
      enabled: body.enabled ?? workflow.enabled,
      name: body.name ?? workflow.name,
      description: body.description ?? workflow.description,
      nodes: body.nodes ?? workflow.nodes,
      connections: body.connections ?? workflow.connections,
      trigger: body.trigger ?? workflow.trigger,
    });

    await this.workflowRepository.save(workflow);

    const webhooks = await this.webhookRepository.find({
      where: { workflow: { id: Number(id) } },
    });

    if (body.trigger === TriggerType.Webhook && body.webhook) {
      if (webhooks.length > 0) {
        const webhook = webhooks[0];
        Object.assign(webhook, {
          title: body.webhook?.title ?? webhook.title,
          method: body.webhook?.method ?? webhook.method,
          secret: body.webhook?.secret ?? webhook.secret,
          endpoint: body.webhook?.endpoint ?? webhook.endpoint,
        });
        await this.webhookRepository.save(webhook);
      } else {
        const newWebhook = this.webhookRepository.create({
          title: body.webhook?.title,
          method: body.webhook.method,
          secret: body.webhook.secret,
          endpoint: body.webhook.endpoint,
          workflow,
        });
        await this.webhookRepository.save(newWebhook);
      }
    } else if (body.trigger !== TriggerType.Webhook && webhooks.length > 0) {
      await this.webhookRepository.remove(webhooks);
    }

    await this.workflowRepository.findOne({
      where: { id: Number(id) },
      relations: ['webhooks', 'executions'],
    });
  }

  async deleteWorkflowById(id: string) {
    const workflow = await this.workflowRepository.findOne({
      where: { id: Number(id) },
    });
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    await this.workflowRepository.remove(workflow);
    return { message: 'Workflow deleted successfully' };
  }

  async runWorkflowById({
    workflowId,
    userId,
  }: {
    workflowId: string;
    userId: string;
  }) {
    const workflow = await this.workflowRepository.findOne({
      where: { id: Number(workflowId) },
      relations: ['nodes', 'connections'],
    });

    if (!workflow) {
      throw new Error('Workflow not found');
    }

    const execution = this.executionRepository.create({
      workflow,
      status: 'running',
      startedAt: new Date(),
    });
    await this.executionRepository.save(execution);

    // Here, you would add the logic to actually run the workflow based on its nodes and connections.
    // This is a placeholder for demonstration purposes.

    // add that to the queue
  }
}
