import { ResendEmailService } from './resend-email.service';
import { Resend } from 'resend';

const mockSend = jest.fn();

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

describe('ResendEmailService', () => {
  let service: ResendEmailService;
  let fetchMock: jest.SpyInstance;
  const originalLookupKey = process.env.RESEND_API_KEY_LOOKUP_KEY;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RESEND_API_KEY_LOOKUP_KEY = 'test-key-from-env';
    fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [{ content: 're_test_api_key' }],
    } as Response);
    service = new ResendEmailService();
  });

  afterEach(() => {
    fetchMock.mockRestore();
    if (originalLookupKey === undefined) {
      delete process.env.RESEND_API_KEY_LOOKUP_KEY;
    } else {
      process.env.RESEND_API_KEY_LOOKUP_KEY = originalLookupKey;
    }
  });

  it('retrieves and caches the API key while sending text and HTML emails', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-id' }, error: null });

    await service.sendEmail('recipient@example.com', 'Hello', 'Subject');
    await service.sendHtmlEmail(
      'recipient@example.com',
      'HTML subject',
      '<p>Hello</p>',
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toBe(
      'https://abra-api.top/notifications/retrieve?key=test-key-from-env',
    );
    expect(Resend).toHaveBeenCalledTimes(1);
    expect(Resend).toHaveBeenCalledWith('re_test_api_key');
    expect(mockSend).toHaveBeenNthCalledWith(1, {
      from: 'onboarding@resend.dev',
      to: 'recipient@example.com',
      subject: 'Subject',
      text: 'Hello',
    });
    expect(mockSend).toHaveBeenNthCalledWith(2, {
      from: 'onboarding@resend.dev',
      to: 'recipient@example.com',
      subject: 'HTML subject',
      html: '<p>Hello</p>',
    });
  });

  it('does not report success when Resend rejects the email', async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: 'Rejected' },
    });

    await expect(
      service.sendEmail('recipient@example.com', 'Hello', 'Subject'),
    ).rejects.toThrow('Email delivery failed');
  });
});
