import { IsOptional, IsString } from "class-validator";

export class NotificationRequest {
    
    @IsOptional()
    user: string;
    
    @IsOptional()
    url: string;
    
    @IsString()
    key: string;
    
    constructor(user: string, url: string, key: string) {
        this.user = user;
        this.url = url;
        this.key = key;
    }
}