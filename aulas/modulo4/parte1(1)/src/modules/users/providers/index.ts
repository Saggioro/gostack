import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// o primeiro parâmetro é o id, geralmente utiliza-se o nome do repositório/classe
// o segundo é o que ele vai retornar
// a tipagem é opcional, mas coloca-se a interface do segundo parâmetro para
// obriga-lo a ter o formato desejado, senão não funciona
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
