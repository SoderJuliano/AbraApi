import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendHtmlEmailDto {
    @ApiProperty({ example: 'recipient@example.com', description: 'Email address of the recipient' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Hello', description: 'Subject of the email' })
    @IsString()
    subject: string;

    @ApiProperty({ example: '<h1>Abra API tempalte</h1></br><p>Test e-mail</p>', description: 'HTML content of the email' })
    @IsString()
    htmlContent: string;
}