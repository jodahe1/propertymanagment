import { Test, TestingModule } from '@nestjs/testing';
import { SharedKernelService } from './shared-kernel.service';

describe('SharedKernelService', () => {
  let service: SharedKernelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedKernelService],
    }).compile();

    service = module.get<SharedKernelService>(SharedKernelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
