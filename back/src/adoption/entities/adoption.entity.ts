import { Animal } from "../../animal/entities/animal.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";

export enum AdoptionStatus {
    PENDIENTE = "PENDIENTE",
    APROBADA = "APROBADA",
    RECHAZADA = "RECHAZADA"
}

@Entity('adoption')
export class Adoption extends CommonEntity {
    @Column({ type: 'enum', enum: AdoptionStatus, default: AdoptionStatus.PENDIENTE })
    status: AdoptionStatus;

    @Column({ nullable: false })
    voucher: string;

    @Column({ nullable: true })
    observations: string;

    @OneToOne(() => Animal, (animal) => animal.adoption)
    idAnimal: Animal;

    @OneToOne(() => User, (user) => user.adoption)
    idUser: User;
}
