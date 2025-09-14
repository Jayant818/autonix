import { PLATFORMSUPPORTED } from '@repo/db/src/entities/Credentials.entity';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsIn(Object.values(PLATFORMSUPPORTED))
  platform: PLATFORMSUPPORTED;

  @IsNotEmpty()
  data: Record<string, any>;
}
