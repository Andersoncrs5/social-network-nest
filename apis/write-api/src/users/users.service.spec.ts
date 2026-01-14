import { Test, type TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { ModelNotFoundException } from '@app/common';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  const mockUserRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepository, 
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: '1', name: 'Darkness' } as User;
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findOneById('1');

      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw ModelNotFoundException if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.findOneById('999')).rejects.toThrow(
        ModelNotFoundException,
      );
    });
  });
});