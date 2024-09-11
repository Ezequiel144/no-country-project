import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAnimalTypesDto } from './dto/create-animaltypes.dto';
import { AnimalTypesAnimalDTO, AnimalTypesDto } from './dto/animaltypes.dto';
import { UpdateAnimalTypesDto } from './dto/update-animaltypes.dto';
import { AnimalTypes } from './entities/animaltypes.entity';
import { plainToInstance } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AnimalTypesService {
  constructor(
    @InjectRepository(AnimalTypes)
    private readonly animaltypesRepository: Repository<AnimalTypes>
  ) { }

  async create(createAnimalTypesDto: CreateAnimalTypesDto) {
    try {
      const resanimaltypes = await this.animaltypesRepository.findOne({
        where: { name: createAnimalTypesDto.name },
      });

      if (resanimaltypes) throw new BadRequestException('Tipo ya existe');
      const animaltypes = this.animaltypesRepository.create(createAnimalTypesDto);
      await this.animaltypesRepository.save(animaltypes);
      return plainToInstance(AnimalTypesDto, animaltypes);
    } catch (error) {
      throw new HttpException('Tipo no guardado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findActives(options: IPaginationOptions): Promise<Pagination<AnimalTypesDto>> {
    try {
      const queryBuilder = this.animaltypesRepository.createQueryBuilder('animaltypes');
      queryBuilder.orderBy('animaltypes.createAt', 'ASC');

      const paginatedAnimalTypes = await paginate<AnimalTypes>(queryBuilder, options);
      return new Pagination<AnimalTypesDto>(
        plainToInstance(AnimalTypesDto, paginatedAnimalTypes.items),
        paginatedAnimalTypes.meta, paginatedAnimalTypes.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<AnimalTypesDto>> {
    try {
      const queryBuilder = this.animaltypesRepository.createQueryBuilder('user');
      queryBuilder.withDeleted();
      queryBuilder.orderBy('user.createAt', 'ASC');

      const paginatedAnimalTypes = await paginate<AnimalTypes>(queryBuilder, options);
      return new Pagination<AnimalTypesDto>(
        plainToInstance(AnimalTypesDto, paginatedAnimalTypes.items),
        paginatedAnimalTypes.meta, paginatedAnimalTypes.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findOne(id: number): Promise<AnimalTypesDto> {
    const animaltypes = await this.animaltypesRepository.findOne({
      where: {
        id
      } as FindOptionsWhere<AnimalTypes>
    })
    try {
      if (!animaltypes) throw new Error
      return animaltypes;
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado')
    }
  }

  async findAnimals(id: number): Promise<AnimalTypesDto> {
    try {
      const animaltypes = await this.animaltypesRepository.findOne({
        where: {
          id
        } as FindOptionsWhere<AnimalTypes>,
        relations: ['animals']  // Incluye la relación de los animales
      });
  
      if (!animaltypes) throw new NotFoundException('Tipo no encontrado');
      
      return plainToInstance(AnimalTypesAnimalDTO, animaltypes); // Convierte a DTO
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado');
    }
  }

  async update(id: number, updateAnimalTypesDto: UpdateAnimalTypesDto) {
    try {
      return this.animaltypesRepository.update(id, updateAnimalTypesDto);
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado')
    }
  }

  async remove(id: number) {
    try {
      const animaltypesToDelete = await this.animaltypesRepository.softDelete(id)
      if (animaltypesToDelete.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      } else {
        return animaltypesToDelete
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no eliminado');
    }
  }

  async restore(id: number): Promise<AnimalTypes> {
    try {
      const result = await this.animaltypesRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      }
      return this.animaltypesRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no Restaurado');
    }
  }
}
