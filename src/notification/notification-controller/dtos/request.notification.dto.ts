import { IsOptional } from "class-validator";

export class NotificationRequest {

    user: string;
    url: string;
    key: string;
    
    constructor(user: string, url: string, key: string) {
        this.user = user;
        this.url = url;
        this.key = key;
    }
}