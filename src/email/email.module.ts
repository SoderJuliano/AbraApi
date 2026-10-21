import { ResendEmailService } from './resend-email.service';
import { EmailController } from './email.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [ResendEmailService],
})
export class EmailModule {}
