import { WEBHOOK_METHODS } from '@repo/db/src/entities/Webhook.entity';
import { TriggerType } from '@repo/db/src/entities/Workflow.entity';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

export enum NODE_SUPPORTED_TYPES {
  TELEGRAM = 'TELEGRAM',
  RESEND = 'RESEND',
  GEMINI = 'GEMINI',
}

export class createWorkflowDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  @IsEnum(TriggerType)
  trigger: TriggerType;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => NodeDTO)
  nodes: Record<string, NodeDTO>;

  @ValidateNested({ each: true })
  @Type(() => ConnectionDTO)
  connections: ConnectionDTO[];

  @IsBoolean()
  enabled?: boolean;

  @ValidateNested()
  @Type(() => WebhookConfigDTO)
  webhook?: WebhookConfigDTO;
}

export class ConnectionDTO {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  target: string;
}

export class NodeDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsIn(Object.values(NODE_SUPPORTED_TYPES))
  type: NODE_SUPPORTED_TYPES;

  @IsNotEmpty()
  @IsNotEmpty()
  credentialId: number;

  @ValidateNested()
  @Type(() => NodePosition)
  position: NodePosition;

  @IsObject()
  @IsNotEmpty()
  config: Record<string, any>;
}

export class NodePosition {
  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;
}

export class WebhookConfigDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(Object.values(WEBHOOK_METHODS))
  method: WEBHOOK_METHODS;

  @IsString()
  secret?: string;

  @IsString()
  @IsNotEmpty()
  endpoint: string;
}
