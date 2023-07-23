import { Test, TestingModule } from '@nestjs/testing';
import { NotificationControllerController } from './notification-controller.controller';
import { NotificationService } from '../services/notification.service';
import { Logger } from 'src/utils/logger';

describe('NotificationControllerController', () => {
  let controller: NotificationControllerController;

  const NotificationServiceMock = {};
  const LoggerMock = {};  const loggerLogSpy = jest.spyOn(Logger, 'print');
  const loggerErrorSpy = jest.spyOn(Logger, 'printError');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationControllerController],
      providers: [NotificationService, Logger]
    }).overrideProvider(NotificationService).useValue(NotificationServiceMock).compile();

    controller = module.get<NotificationControllerController>(NotificationControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
