import { Body, Controller, Param, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { SendHtmlEmailDto } from "./SendHtmlEmailDto";
import { ApiTags } from "@nestjs/swagger";

@Controller('email')
@ApiTags('Emails')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('send-email/:email/:message/:subject')
    async sendEmail(@Param('email') email: string, @Param('message') message: string,
    @Param('subject') subject: string) {
        await this.emailService.sendEmail(email, message, subject);
        return {
            success: true,
        };
    }

    @Post('send-email/html')
    async sendHtmlEmail(@Body() sendHtmlEmailDto: SendHtmlEmailDto) {
        const { email, subject, htmlContent } = sendHtmlEmailDto;
        await this.emailService.sendHtmlEmail(email, subject, htmlContent);
        return {
            success: true,
        };
    }
}
