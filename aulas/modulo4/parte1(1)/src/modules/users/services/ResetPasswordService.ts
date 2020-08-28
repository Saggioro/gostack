import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('user token does not exists');
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('user does not exists');
        }

        const tokenCreatedAt = userToken.created_at;

        if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
            throw new AppError('token expired');
        }
        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}
