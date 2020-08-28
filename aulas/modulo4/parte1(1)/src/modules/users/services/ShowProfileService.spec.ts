import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
    });
    it('should be able to show the profile', async () => {
        const showProfileService = new ShowProfileService(fakeUsersRepository);

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(user.name).toBe(profile.name);
        expect(user.email).toBe(profile.email);
    });

    it('should not be able to show a non-existing profile', async () => {
        const showProfileService = new ShowProfileService(fakeUsersRepository);

        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
