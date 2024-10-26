import { Test, TestingModule } from '@nestjs/testing';
import { IcuMachineController } from './icu-machine.controller';

describe('IcuMachineController', () => {
  let controller: IcuMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcuMachineController],
    }).compile();

    controller = module.get<IcuMachineController>(IcuMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
