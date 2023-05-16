import { Test, TestingModule } from '@nestjs/testing';
import { NotificationControllerController } from './notification-controller.controller';
import { NotificationService } from '../services/notification.service';

describe('NotificationControllerController', () => {
  let controller: NotificationControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationControllerController],
      providers: [NotificationService]
    }).compile();

    controller = module.get<NotificationControllerController>(NotificationControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
