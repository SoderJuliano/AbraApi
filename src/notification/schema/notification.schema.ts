
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  /**
   * The app name that the notification should be sent to
   * @exemple ['My App']
   */
  @Prop()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  app: string;

  /**
   * Your application url that the notification should be sent to
   * @exemple ['myapp.com']
   */
  @Prop()
  @IsNotEmpty()
  @IsString()
  appUrl: string;

  @Prop()
  dateCreated: Date;

  @Prop()
  dateUpdated: Date;

  /**
   * The notification text to display in the notification
   * @example ['This is a test notification']
   */
  @Prop()
  content: string;
}

export const Notificationchema = SchemaFactory.createForClass(Notification);