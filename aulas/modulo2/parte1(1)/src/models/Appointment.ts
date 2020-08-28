import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Como o construtor recebe todos os atributos exceto o 'id', a função Omit pode
    // ser utilizada para selecionar um objeto e escolher um atributo que não será
    // recebido. Serve para que não seja necessário criar uma interface para um model,
    // o que seria muito estranho. e ainda assim poder indicar os atributos que faltam
    // caso a classe modelo seja alterada, mostrando os erros nas partes da aplicação
    // em que estarão faltando os atributos
}

export default Appointment;
