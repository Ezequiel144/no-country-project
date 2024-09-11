import { AnimalShelter } from "../../animalshelter/entities/animalshelter.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('donations')
export class Donation extends CommonEntity {
    @Column({ nullable: false })
    amount: number;

    @Column({ nullable: false })
    voucher: string;

    @Column({ nullable: true })
    observations: string;

    @OneToOne(() => AnimalShelter, (animalshelter) => animalshelter.donation)
    idAnimalShelther: AnimalShelter

    @OneToOne(() => User, (user) => user.donation)
    idUser: User
}