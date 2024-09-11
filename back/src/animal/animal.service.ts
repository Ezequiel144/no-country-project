import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { plainToInstance } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>
  ) { }

  async create(createAnimalDto: CreateAnimalDto) {
    const animal = await this.animalRepository.findOne({
      where: { name: createAnimalDto.name },
    });

    if (animal) throw new BadRequestException('Animal ya existe');
    try {
      const animal = this.animalRepository.create(createAnimalDto);
      await this.animalRepository.save(animal);
      return plainToInstance(AnimalDto, animal);
    } catch (error) {
      throw new HttpException('Animal no guardado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findActives(options: IPaginationOptions): Promise<Pagination<AnimalDto>> {
    try {
      const queryBuilder = this.animalRepository.createQueryBuilder('animal');
      queryBuilder
        .leftJoinAndSelect('animal.idAnimalShelther', 'animalShelter') // Se contemplan las realciones planteadas en la Entity
        .leftJoinAndSelect('animal.idAnimalTypes', 'animalTypes')
        .orderBy('animal.createAt', 'ASC');

      const paginatedAnimal = await paginate<Animal>(queryBuilder, options);
      return new Pagination<AnimalDto>(
        plainToInstance(AnimalDto, paginatedAnimal.items),
        paginatedAnimal.meta, paginatedAnimal.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Animal no encontrados')
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<AnimalDto>> {
    try {
      const queryBuilder = this.animalRepository.createQueryBuilder('animal');
      queryBuilder
        .withDeleted()
        .leftJoinAndSelect('animal.idAnimalShelther', 'animalShelter')
        .leftJoinAndSelect('animal.idAnimalTypes', 'animalTypes')
        .orderBy('animal.createAt', 'ASC');

      const paginatedAnimal = await paginate<Animal>(queryBuilder, options);
      return new Pagination<AnimalDto>(
        plainToInstance(AnimalDto, paginatedAnimal.items),
        paginatedAnimal.meta, paginatedAnimal.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Animal no encontrados')
    }
  }

  async findOne(id: number): Promise<AnimalDto> {
    const animal = await this.animalRepository.findOne({
      where: {
        id
      } as FindOptionsWhere<Animal>
    })
    try {
      if (!animal) throw new Error
      return animal;
    } catch (error) {
      throw new NotFoundException(error.message, 'Animal no encontrado')
    }
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    try {
      return this.animalRepository.update(id, updateAnimalDto);
    } catch (error) {
      throw new NotFoundException(error.message, 'Animal no encontrado')
    }
  }

  async remove(id: number) {
    try {
      const animalToDelete = await this.animalRepository.softDelete(id)
      if (animalToDelete.affected === 0) {
        throw new NotFoundException('Animal no encontrado');
      } else {
        return animalToDelete
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Animal no eliminado');
    }
  }

  async restore(id: number): Promise<Animal> {
    try {

      const result = await this.animalRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException('Animal no encontrado');
      }

      return this.animalRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Animal no Restaurado');
    }
  }
}
