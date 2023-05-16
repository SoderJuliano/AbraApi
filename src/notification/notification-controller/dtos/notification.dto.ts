import { IsNotEmpty, IsString } from "class-validator";
export class NotificationDTO {
    

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
        this.setDataCriacao();
    }
}