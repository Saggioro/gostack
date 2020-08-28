import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    // todo método do controller retorna uma response
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;

        // conversões não são consideradas regras de negócio
        const parsedDate = parseISO(date);

        // carrega o CreateAp... e verifica se precisa de qualquer dependência, que está definido no
        // próprio CreateAp..., e então ele vai no arquivo index do container e verifica
        // se existe alguma dependencia cadastrada com o id que foi informado no CreateApp...
        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        return response.json(appointment);
    }
}
