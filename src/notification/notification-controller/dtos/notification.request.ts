import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { NotificationDTO } from "./notification.dto";

export class NotificationRequestDTO {
         
    /**
     * Id for representation of mongo objectId
     * will only show during some retuns
     * @example '6462eb672fa0abf4069bc1a5'
     */
    @ApiProperty()
    @IsString()
    id: string;

    /**
     * Every notification should have a title
     * @example 'I`m a notification'
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    /**
   * The app name that the notification should be sent to
   * @example 'My App'
   */
    @IsOptional()
    app: string;

    /**
   * Your application url that the notification should be sent to
   * @example 'myapp.com'
   */
    @IsOptional()
    appUrl: string;

    /**
     * The user can be null and in this case
     * the notification will be showed only with the key
     * But you can set a user to recive this notification
     * whwre the field can be filled with email, id or any other user identification
     * @example 'myuser@example.com'
     */
    @IsOptional()
    @ApiHideProperty()
    user: string;

    /**
     * The key needed to read this notification.
     * Can be used ids, emails or whatever you want as a notification opener key
     * @example '!@ExempleKey'
     */
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    key: string;

    @ApiHideProperty()
    dateCreated: Date;

    @ApiHideProperty()
    dateUpdated: Date;

    /**
     * The language that the notification should be displayed
     * @example 'pt-br'
     */
    @ApiHideProperty()
    language: string;

    /**
   * The notification text to display in the notification
   * @example 'This is a test notification'
   */
    @ApiProperty()
    content: string;

    @ApiHideProperty()
    read: boolean = false;

}
