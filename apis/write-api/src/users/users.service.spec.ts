import { Test, type TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { UserRepository } from './users.repository.js';
import { User } from './entities/user.entity.js';
import { ModelNotFoundException } from '@app/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;
  const mockUser = {
    id: '1',
    name: 'Darkness',
    email: 'darkness@gmail.com',
  } as User;

  const mockUserRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
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
    it('should return user when find by id', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const user: User | null = await service.findOneById(mockUser.id);

      expect(user).not.toBeNull();
      expect(user!.id).toBe(mockUser.id);
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when findById', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const user = await service.findOneById(mockUser.id);

      expect(user).toBeNull();
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByIdSimple', () => {
    it('should return a user if found', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findOneByIdSimple('1');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw ModelNotFoundException if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.findOneByIdSimple('999')).rejects.toThrow(
        ModelNotFoundException,
      );
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete user by id', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.delete.mockResolvedValue(undefined);

      await service.remove(mockUser.id);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.id);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(mockUser.id);

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw ModelNotFoundException', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        ModelNotFoundException,
      );

      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
