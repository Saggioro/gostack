import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });
    it('should be able to recover password with email', async () => {
        const sendmail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(sendmail).toHaveBeenCalled();
    });
    it('should not be able to recover password with non-existing email', async () => {
        await expect(
            sendForgotPasswordEmailService.execute({
                email: 'non-existing-email@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            email: 'teste@gmail.com',
            name: 'Deson Dourante',
            password: '123321',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
