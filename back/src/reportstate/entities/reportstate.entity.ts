import { Animal } from "../../animal/entities/animal.entity";
import { CommonEntity } from "../../common/entities/common.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity('reportstate')
export class ReportState extends CommonEntity {
    @Column({ nullable: false })
    name: string

    @OneToMany(() => Animal, (animal) => animal.idReportState, { cascade: true })
    animal: Animal[];
}
