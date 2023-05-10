import { IsNotEmpty, IsString } from "class-validator";
import moment from "moment";
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

    dateCreated: Date;

    dateUpdated: Date;

    /**
   * The notification text to display in the notification
   * @example 'This is a test notification'
   */
    content: string;
 
    setDataCriacao(){
        this.dateCreated = new Date(moment().format('yyyy-MM-DD:hh:mm:ss'));
    }
}