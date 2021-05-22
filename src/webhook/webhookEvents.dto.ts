import {IsArray, IsString} from 'class-validator';
import {Expose} from 'class-transformer';
import {WebhookEvent} from '@line/bot-sdk';

export class WebhookEventsDto {
  @Expose()
  @IsString()
  destination: string;

  @Expose()
  @IsArray()
  events: WebhookEvent[];
}
