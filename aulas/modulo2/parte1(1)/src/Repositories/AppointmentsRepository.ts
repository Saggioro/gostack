import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';
// Data Transfer Object - DTO

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        //      const findAppointment = this.appointments.find(appointment =>
        //          isEqual(date, appointment.date),
        //     );

        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }

    // ao chamar uma função com DTO, os parâmetros são enviados em objeto e
    // é possível identificar quais variaveis estão faltando, em vez de receber
    // apenas "você enviou 2 parâmetros, mas 3 eram esperados"
}

export default AppointmentsRepository;
