import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
// Data Transfer Object - DTO

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        //      const findAppointment = this.appointments.find(appointment =>
        //          isEqual(date, appointment.date),
        //     );

        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment || undefined;
        // pode ser apenas 'return findAppointment', porque já é definido no retorno acima
    }

    // ao chamar uma função com DTO, os parâmetros são enviados em objeto e
    // é possível identificar quais variaveis estão faltando, em vez de receber
    // apenas "você enviou 2 parâmetros, mas 3 eram esperados"
    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
