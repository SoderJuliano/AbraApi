import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class NotificationDeleteRequest {
    
    /**
     * Mongo objectId
     * @xemple '6498383fd9d918614f3e79Ac'
     */
    @ApiProperty()
    @IsString()
    id: string;

    user: string;

    appUrl: string;
    
    @ApiProperty()
    @IsString()
    key: string;

    constructor(user: string, url: string, key: string, id: string) {
        this.user = user;
        this.appUrl = url;
        this.key = key;
        this.id = id;
    }
    
}