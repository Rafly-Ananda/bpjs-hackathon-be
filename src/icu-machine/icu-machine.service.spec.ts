import { Test, TestingModule } from '@nestjs/testing';
import { IcuMachineService } from './icu-machine.service';

describe('IcuMachineService', () => {
  let service: IcuMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcuMachineService],
    }).compile();

    service = module.get<IcuMachineService>(IcuMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
