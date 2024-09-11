import { CommonEntity } from "../entities/common.entity";

export class CommonService {
    /**
     * Filtra entidades según el valor del campo booleano 'state'.
     * @param entities Lista de entidades a filtrar.
     * @param stateValue Valor booleano para filtrar las entidades.
     * @returns Una lista de entidades donde 'state' coincide con 'stateValue'.
     */
    filterByState<T extends CommonEntity>(entities: T[], stateValue: boolean): T[] {
        return entities.filter(entity => entity.state === stateValue);
    }
}