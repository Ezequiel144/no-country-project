import { AnimalTypes } from "../../animaltype/entities/animaltypes.entity";
import { AnimalShelter } from "../../animalshelter/entities/animalshelter.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { ReportState } from "../../reportstate/entities/reportstate.entity";
import { AnimalFeatures } from "../../animalfeatures/entities/animalfeatures.entity";
import { Adoption } from "../../adoption/entities/adoption.entity";

@Entity('animal')
export class Animal extends CommonEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    profileUrlImage: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    observations: string;

    @ManyToOne(() => AnimalShelter, (animalshelter) => animalshelter.animal)
    idAnimalShelther: AnimalShelter

    @ManyToOne(() => AnimalTypes, (animaltypes) => animaltypes.animal)
    idAnimalTypes: AnimalTypes

    @ManyToOne(() => AnimalFeatures, (animalfeatures) => animalfeatures.animal)
    idAnimalFeatures: AnimalFeatures

    @ManyToOne(() => ReportState, (reportstate) => reportstate.animal)
    idReportState: ReportState

    // Relación OneToOne inversa con Adoption
    @OneToOne(() => Adoption, (adoption) => adoption.idAnimal)
    adoption: Adoption;
}