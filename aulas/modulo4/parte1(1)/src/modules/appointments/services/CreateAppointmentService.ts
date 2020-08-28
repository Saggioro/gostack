// service: recebe informações, trata erros/excessões e acessa o repositório

import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    provider_id: string;
    date: Date;
}
// SOLID
// Dependency invertion - a rota envia o repositório
@injectable()
class CreateAppointmentService {
    // o construtor recebe o repositório por parâmetro
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    // funçõesa assincronas retornam "Promise"s
    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw new AppError('this apppointment is already booked');
        }
        // no insomnia, apertar control+espaço e selecionar o tipo timestamp ISO-8601
        // cria uma instância Entity sem acessar o BD, logo não precisa ser async
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
