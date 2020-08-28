import 'reflect-metadata';

import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
// sempre importar o async erros depois do express
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
// rota para visualizar arquivos. É necessário apenas acessar LOCAL/files/nomedoaqr.png
app.use(routes);

// tratativa de error tem que ser depois das rotas
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('(* ω *) Server started on port 3333 (* ω *)');
});
