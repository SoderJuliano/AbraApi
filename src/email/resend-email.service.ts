import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Resend } from 'resend';

const RESEND_FROM_ADDRESS = 'onboarding@resend.dev';

@Injectable()
export class ResendEmailService {
  private readonly logger = new Logger(ResendEmailService.name);
  private apiKeyPromise: Promise<string> | null = null;
  private resendClient: Resend | null = null;

  async sendHtmlEmail(
    email: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    await this.send({ to: email, subject, html: htmlContent });
  }

  async sendEmail(
    email: string,
    message: string,
    subject: string,
  ): Promise<void> {
    await this.send({ to: email, subject, text: message });
  }

  private async send(
    email:
      | { to: string; subject: string; html: string; text?: never }
      | { to: string; subject: string; text: string; html?: never },
  ): Promise<void> {
    const resend = await this.getResendClient();
    const { error } = await resend.emails.send({
      from: RESEND_FROM_ADDRESS,
      ...email,
    });

    if (error) {
      this.logger.error(`Resend email delivery failed: ${error.message}`);
      throw new InternalServerErrorException('Email delivery failed');
    }
  }

  private async getResendClient(): Promise<Resend> {
    if (this.resendClient) {
      return this.resendClient;
    }

    this.resendClient = new Resend(await this.getApiKey());
    return this.resendClient;
  }

  private getApiKey(): Promise<string> {
    if (!this.apiKeyPromise) {
      this.apiKeyPromise = this.retrieveApiKey().catch((error: unknown) => {
        this.apiKeyPromise = null;
        throw error;
      });
    }

    return this.apiKeyPromise;
  }

  private async retrieveApiKey(): Promise<string> {
    const notificationKey = process.env.RESEND_API_KEY_LOOKUP_KEY?.trim();
    if (!notificationKey) {
      throw new InternalServerErrorException(
        'RESEND_API_KEY_LOOKUP_KEY is not configured',
      );
    }

    const url = new URL('https://abra-api.top/notifications/retrieve');
    url.searchParams.set('key', notificationKey);

    const response = await fetch(url);
    if (!response.ok) {
      throw new InternalServerErrorException(
        `Could not retrieve the Resend API key (HTTP ${response.status})`,
      );
    }

    const notifications: unknown = await response.json();
    if (!Array.isArray(notifications)) {
      throw new InternalServerErrorException('Invalid Resend API key response');
    }

    const apiKey = notifications
      .map((notification: unknown) => {
        if (
          typeof notification === 'object' &&
          notification !== null &&
          'content' in notification &&
          typeof notification.content === 'string'
        ) {
          return notification.content.trim();
        }
        return '';
      })
      .find((content: string) => content.length > 0);

    if (!apiKey) {
      throw new InternalServerErrorException('Resend API key was not found');
    }

    return apiKey;
  }
}
