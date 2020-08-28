import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        );
    });
    it('should be able to reset the passoword', async () => {
        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });
        const token = await fakeUserTokensRepository.generate(user.id);

        const hash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token: token.token,
            password: '123123',
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(hash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the passoword with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the passoword of a non-existing user', async () => {
        const token = await fakeUserTokensRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPasswordService.execute({
                token: token.token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the passoword if passed more than 2 hours', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        const token = await fakeUserTokensRepository.generate(user.id);

        await expect(
            resetPasswordService.execute({
                token: token.token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
