import { IsOptional, IsString } from "class-validator";

export class NotificationDeleteRequest {
    
    /**
     * Mongo objectId
     */
    @IsString()
    id: string;

    @IsOptional()
    user: string;
    
    @IsOptional()
    url: string;
    
    @IsString()
    key: string;
    
}