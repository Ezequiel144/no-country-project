import { Animal } from "../../animal/entities/animal.entity";
import { AnimalTypes } from "../../animaltype/entities/animaltypes.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('animalfeatures')
export class AnimalFeatures extends CommonEntity {
    @Column({ nullable: false })
    name: string
   
    @ManyToMany(() => AnimalTypes, (animalTypes) => animalTypes.animalFeatures)
    @JoinTable()
    animalTypes: AnimalTypes[];

    @OneToMany(() => Animal, (animal) => animal.idAnimalFeatures, { cascade: true })
    animal: Animal[];
}
