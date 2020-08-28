import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
// SOLID

// Single Responsability Principle
// Open Closed Principle
// Liskov Substitution Principle
// Interface Segregation Principle
// Dependency Invertion principle

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// utiliza o middleware em todas as rotas, mas caso queria usar em uma especifica
// é necessário apenas colocar no segundo parâmetro após '/', ensure..., (req,res)...
appointmentsRouter.use(ensureAuthenticated);

// não precisa definir a rota, porque ela já foi definida no index
/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
