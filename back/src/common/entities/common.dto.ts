import { Exclude, Expose } from "class-transformer"

export abstract class CommonDto {
    @Expose()
    id: number

    @Exclude()
    state?: boolean

    @Exclude()
    createAt?: Date

    @Exclude()
    updateAt?: Date

    @Exclude()
    deleteAt?: Date
}