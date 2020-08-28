import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
    it('should be able to upload a new avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        const updatedUser = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        expect(updatedUser.avatar).toBe('avatar.png');
    });
    it('should not be able to upload a avatar from a non-existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        expect(
            updateUserAvatarService.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should delete an existing avatar before inserting a new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        // fica observando a função 'deleteFile' do fakeStorageProvider
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'teste.png',
        });

        const updatedUser = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });
        // verifica se a função 'deleteFile' foi chamada com 'teste.png' como parametro
        expect(deleteFile).toBeCalledWith('teste.png');

        expect(updatedUser.avatar).toBe('avatar.png');
    });
});
