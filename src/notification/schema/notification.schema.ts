
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  
  @Prop()
  app: string;

  @Prop()
  appUrl: string;

  @Prop()
  user: string;

  @Prop()
  dateCreated: Date;

  @Prop()
  dateUpdated: Date;

  @Prop()
  language: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  key: string;

  @Prop()
  read: boolean;

}

export const Notificationchema = SchemaFactory.createForClass(Notification);