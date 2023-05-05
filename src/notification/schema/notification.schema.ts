
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop()
  app: string;

  @Prop()
  dateCreated: Date;

  @Prop()
  dateUpdated: Date;

  @Prop()
  content: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);