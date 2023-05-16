import { IsNotEmpty } from "class-validator";

export class RecoverNotificationDTO {

    /**
     * The url site for whose is the notification
     * @example 'https://www.google.com/'
     */
    url: string;
    
    /**
     * The key for recover the notification
     * @example '!@ExempleKey'
     */
    @IsNotEmpty()
    key: string;

    getKey(): string { return this.key; }
    getUrl(): string { return this.url; }
}