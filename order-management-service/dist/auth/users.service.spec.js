"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_service_1 = require("./users.service");
describe('UsersService', () => {
    let usersService;
    let userRepository;
    const mockUserRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                { provide: 'UserRepository', useValue: mockUserRepository },
            ],
        }).compile();
        usersService = module.get(users_service_1.UsersService);
        userRepository = module.get('UserRepository');
    });
    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });
});
