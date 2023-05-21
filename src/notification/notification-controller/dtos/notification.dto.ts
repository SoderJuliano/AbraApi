import { IsNotEmpty, IsString } from "class-validator";
import { NotificationDocument } from "../../schema/notification.schema"
import { Transform, Type } from "class-transformer";
import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";
export class NotificationDTO {
    
    /**
     * Id for representation of mongo objectId
     * will only show during some retuns
     * @example '6462eb672fa0abf4069bc1a5'
     */
    id: string;

    /**
     * Every notification should have a title
     * @example 'I`m a notification'
     */
    @IsNotEmpty()
    @IsString()
    title: string;

    /**
   * The app name that the notification should be sent to
   * @example 'My App'
   */
    @IsNotEmpty()
    @IsString()
    app: string;

    /**
   * Your application url that the notification should be sent to
   * @example 'myapp.com'
   */
    @IsNotEmpty()
    @IsString()
    appUrl: string;

    /**
     * The user can be null and in this case
     * the notification will be showed only with the key
     * But you can set a user to recive this notification
     * whwre the field can be filled with email, id or any other user identification
     * @example 'myuser@example.com'
     */
    user: string;

    /**
     * The key needed to read this notification.
     * Can be used ids, emails or whatever you want as a notification opener key
     * @example '!@ExempleKey'
     */
    @IsNotEmpty()
    @IsString()
    key: string;

    dateCreated: Date;

    dateUpdated: Date;

    /**
   * The notification text to display in the notification
   * @example 'This is a test notification'
   */
    content: string;

    read: boolean = false;

    setRead(){
        this.read = true;
    }
 
    setDataCriacao(){
        this.dateCreated = new Date(Date.now());
        this.dateUpdated = null;
    }

    setDataAtualizacao(){
        this.dateUpdated = new Date(Date.now());
    }

    getApp(){
        return  this.app;
    }
    getAppUrl(){
        return this.appUrl;
    }
    
    getDateCreated(){
        return this.dateCreated;
    }

    getDateUpdated(){
        return this.dateUpdated;
    }

    getContent(){
        return this.content;
    }

    from(newn: NotificationDTO){
        this.app = newn.app;
        this.appUrl = newn.appUrl;
        this.content = newn.content;
        this.key = newn.key;
        this.read = newn.read;
        this.user = newn.user;
        this.setDataCriacao();
    }

    schemaToDto(notification: NotificationDocument): NotificationDTO {
        
        this.app = notification.app;
        this.appUrl = notification.appUrl;
        this.content = notification.content;
        this.key = notification.key;
        this.read = notification.read;
        this.dateCreated = notification.dateCreated;
        this.dateUpdated = notification.dateUpdated;
        this.id = notification._id?.toString();
        this.user = notification.user;
        return this;

    }
}
