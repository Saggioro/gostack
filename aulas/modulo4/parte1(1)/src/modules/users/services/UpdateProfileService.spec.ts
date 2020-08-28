import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
    });
    it('should be able to update the profile', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            email: 'teste2@gmail.com',
            name: 'Thomas Turbando',
        });

        expect(updatedUser.name).toBe('Thomas Turbando');
        expect(updatedUser.email).toBe('teste2@gmail.com');
    });

    it('should not be able to update the profile email with some that is already in use', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await fakeUsersRepository.create({
            email: 'teste2@gmail.com',
            name: 'Kuca Beludo',
            password: '123321',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                email: 'teste2@gmail.com',
                name: 'Thomas Turbando',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            email: 'teste2@gmail.com',
            name: 'Thomas Turbando',
            password: '123123',
            old_password: '123321',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                email: 'teste2@gmail.com',
                name: 'Thomas Turbando',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                email: 'teste2@gmail.com',
                name: 'Thomas Turbando',
                password: '123123',
                old_password: 'wrong-old-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to update a non-existing user', async () => {
        const updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        expect(
            updateProfileService.execute({
                user_id: 'non-existing-user',
                email: 'teste2@gmail.com',
                name: 'Thomas Turbando',
                password: '123123',
                old_password: 'wrong-old-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
