import { Test, TestingModule } from '@nestjs/testing';
import { NotificationControllerController } from './notification-controller.controller';
import { NotificationService } from '../services/notification.service';
import { Logger } from 'src/utils/logger';
import { AppController } from 'src/app.controller';
import { NotificationRequest } from './dtos/request.notification.dto';

describe('NotificationControllerController', () => {
  let controller: NotificationControllerController;

  const NotificationServiceMock = {
    // Mock the methods your controller uses
    sendNotification: jest.fn().mockResolvedValue({}),
    getHello: jest.fn(() => {
      return "Hello world"
    }),
    getNotification: jest.fn(() => {
      return []
    }),
    retrieveNotification: jest.fn(() => {
      return []
    })
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationControllerController],
      providers: [NotificationService]
    }).overrideProvider(NotificationService).useValue(NotificationServiceMock).compile();

    controller = module.get<NotificationControllerController>(NotificationControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('must get the greetings message', () => {
    const greetingsMessage = controller.getHello();
    expect(greetingsMessage).toBe("Hello world");
  });

  it('must return and array when call getNotifications', () => {
    expect(Array.isArray(controller.getNotification(new NotificationRequest('user', 'url', 'key')))).toBe(true);
  });

  it('must return an array when call retrieveNotification', () => {
    expect(Array.isArray(controller.retrieveNotification(new NotificationRequest('user', 'url', 'key')))).toBe(true);
  });
});
