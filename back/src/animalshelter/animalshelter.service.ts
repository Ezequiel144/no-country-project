import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAnimalShelterDto } from './dto/create-animalshelter.dto';
import { AnimalShelterDto } from './dto/animalshelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animalshelter.dto';
import { AnimalShelter } from './entities/animalshelter.entity';
import { plainToInstance } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { AnimalTypes } from '../animaltype/entities/animaltypes.entity';

@Injectable()
export class AnimalShelterService {
  constructor(
    @InjectRepository(AnimalShelter) private readonly animalshelterRepository: Repository<AnimalShelter>,
    @InjectRepository(AnimalTypes) private readonly animalTypesRepository: Repository<AnimalTypes>
  ) { }

  async create(createAnimalShelterDto: CreateAnimalShelterDto) {
    try {
      const resanimalshelter = await this.animalshelterRepository.findOne({
        where: { name: createAnimalShelterDto.name },
      });

      if (resanimalshelter) throw new BadRequestException('Tipo ya existe');
      const animalshelter = this.animalshelterRepository.create(createAnimalShelterDto);
      await this.animalshelterRepository.save(animalshelter);
      return plainToInstance(AnimalShelterDto, animalshelter);
    } catch (error) {
      throw new HttpException('Tipo no guardado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addAnimalTypeToAnimalShelter(animalShelterId: number, animalTypesId: number): Promise<AnimalShelterDto> {
    const animalshelter = await this.animalshelterRepository.findOne({
      where: { id: animalShelterId },
      relations: ['animaltypes'],
    });
    const animaltype = await this.animalTypesRepository.findOneBy({ id: animalTypesId });

    if (!animalshelter || !animaltype) {
      throw new Error('Animal Shelter or Animal Type not found');
    }

    animalshelter.animalTypes.push(animaltype);
    return this.animalshelterRepository.save(animalshelter);
  }

  async findActives(options: IPaginationOptions): Promise<Pagination<AnimalShelterDto>> {
    try {
      const queryBuilder = this.animalshelterRepository.createQueryBuilder('animalshelter');
      queryBuilder.orderBy('animaltypes.createAt', 'ASC');

      const paginatedAnimalShelter = await paginate<AnimalShelter>(queryBuilder, options);
      return new Pagination<AnimalShelterDto>(
        plainToInstance(AnimalShelterDto, paginatedAnimalShelter.items),
        paginatedAnimalShelter.meta, paginatedAnimalShelter.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findPendingAcceptance(options: IPaginationOptions): Promise<Pagination<AnimalShelterDto>> {
    try {
      const queryBuilder = this.animalshelterRepository.createQueryBuilder('animalshelter');
      queryBuilder
      .where('animalshelter.state = :state', { state: false })
      .orderBy('animaltypes.createAt', 'ASC');

      const paginatedAnimalShelter = await paginate<AnimalShelter>(queryBuilder, options);
      return new Pagination<AnimalShelterDto>(
        plainToInstance(AnimalShelterDto, paginatedAnimalShelter.items),
        paginatedAnimalShelter.meta, paginatedAnimalShelter.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<AnimalShelterDto>> {
    try {
      const queryBuilder = this.animalshelterRepository.createQueryBuilder('animalshelter');
      queryBuilder.withDeleted();
      queryBuilder.orderBy('animaltypes.createAt', 'ASC');

      const paginatedAnimalShelter = await paginate<AnimalShelter>(queryBuilder, options);
      return new Pagination<AnimalShelterDto>(
        plainToInstance(AnimalShelterDto, paginatedAnimalShelter.items),
        paginatedAnimalShelter.meta, paginatedAnimalShelter.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findOne(id: number): Promise<AnimalShelterDto> {
    const animalshelter = await this.animalshelterRepository.findOne({
      where: {
        id
      } as FindOptionsWhere<AnimalShelter>
    })
    try {
      if (!animalshelter) throw new Error
      return animalshelter;
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado')
    }
  }

  async update(id: number, updateAnimalShelterDto: UpdateAnimalShelterDto) {
    try {
      return this.animalshelterRepository.update(id, updateAnimalShelterDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no eliminado');
    }
  }

  async remove(id: number) {
    try {
      const animalshelterToDelete = await this.animalshelterRepository.softDelete(id)
      if (animalshelterToDelete.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      } else {
        return animalshelterToDelete
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no eliminado');
    }
  }

  async restore(id: number): Promise<AnimalShelter> {
    try {
      const result = await this.animalshelterRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      }
      return this.animalshelterRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no Restaurado');
    }
  }
}
