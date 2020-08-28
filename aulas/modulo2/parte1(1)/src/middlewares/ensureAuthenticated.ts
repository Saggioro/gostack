import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validação do token jwt
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Bearer 57t03b847y62b1803476b29108.2414y0817y412.3'9107y3'0917y3
    // Split com espaço em branco para separar a palavra bearer do token
    // A const vira um array, podendo desestruturar
    // const [type, token] = authHeader.split(' ');
    // Como o type não é preciso, no JS é preciso apenas a virgula
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token');
    }
}
