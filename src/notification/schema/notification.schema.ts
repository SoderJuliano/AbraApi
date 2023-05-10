
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  
  @Prop()
  app: string;

  @Prop()
  appUrl: string;

  @Prop()
  dateCreated: Date;

  @Prop()
  dateUpdated: Date;

  @Prop()
  content: string;
}

export const Notificationchema = SchemaFactory.createForClass(Notification);