import { Animal } from "../../animal/entities/animal.entity";
import { AnimalFeatures } from "../../animalfeatures/entities/animalfeatures.entity";
import { AnimalShelter } from "../../animalshelter/entities/animalshelter.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity('animaltypes')
export class AnimalTypes extends CommonEntity {
    @Column({ nullable: false })
    name: string
   
    @ManyToMany(() => AnimalShelter, (animalShelter) => animalShelter.animalTypes)
    animalShelters: AnimalShelter[];

    @ManyToMany(() => AnimalFeatures, (animalFeatures) => animalFeatures.animalTypes)
    animalFeatures: AnimalFeatures[];

    @OneToMany(() => Animal, (animal) => animal.idAnimalTypes, { cascade: true })
    animal: Animal[];
}
