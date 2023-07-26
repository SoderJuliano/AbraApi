import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  
  const AppServiceMock = {
    getAllNotifications: jest.fn(() => {
      return [];
    })
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).overrideProvider(AppService).useValue(AppServiceMock).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
  
  it('should return an array', () => {
    expect(Array.isArray(appController.getAllNotifications())).toBe(true);
  });
});
