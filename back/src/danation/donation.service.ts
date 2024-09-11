import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { DonationDto } from './dto/donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';
import { plainToInstance } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { AnimalShelter } from '../animalshelter/entities/animalshelter.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    @InjectRepository(AnimalShelter)
    private readonly animalShelterRepository: Repository<AnimalShelter>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createDonationDto: CreateDonationDto) {
    try {
      const donation = new Donation();

      // Asignar valores simples
      donation.amount = createDonationDto.amount;
      donation.voucher = createDonationDto.voucher;
      donation.observations = createDonationDto.observations;

      // Transformar los IDs en entidades
      donation.idAnimalShelther = await this.animalShelterRepository.findOneByOrFail({ id: createDonationDto.idAnimalShelther });
      donation.idUser = await this.userRepository.findOneByOrFail({ id: createDonationDto.idUser });

      await this.donationRepository.save(donation);
      return plainToInstance(DonationDto, donation);
    } catch (error) {
      throw new HttpException('Donation no guardado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findActives(options: IPaginationOptions): Promise<Pagination<DonationDto>> {
    try {
      const queryBuilder = this.donationRepository.createQueryBuilder('donation');
      queryBuilder
        .leftJoinAndSelect('donation.idDonationShelther', 'donationShelter') // Se contemplan las realciones planteadas en la Entity
        .leftJoinAndSelect('donation.idDonationTypes', 'donationTypes')
        .orderBy('donation.createAt', 'ASC');

      const paginatedDonation = await paginate<Donation>(queryBuilder, options);
      return new Pagination<DonationDto>(
        plainToInstance(DonationDto, paginatedDonation.items),
        paginatedDonation.meta, paginatedDonation.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Donation no encontrados')
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<DonationDto>> {
    try {
      const queryBuilder = this.donationRepository.createQueryBuilder('donation');
      queryBuilder
        .withDeleted()
        .leftJoinAndSelect('donation.idDonationShelther', 'donationShelter')
        .leftJoinAndSelect('donation.idDonationTypes', 'donationTypes')
        .orderBy('donation.createAt', 'ASC');

      const paginatedDonation = await paginate<Donation>(queryBuilder, options);
      return new Pagination<DonationDto>(
        plainToInstance(DonationDto, paginatedDonation.items),
        paginatedDonation.meta, paginatedDonation.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Donation no encontrados')
    }
  }

  async findOne(id: number): Promise<DonationDto> {
    const donation = await this.donationRepository.findOne({
      where: {
        id
      } as FindOptionsWhere<Donation>
    })
    try {
      if (!donation) throw new Error
      return donation;
    } catch (error) {
      throw new NotFoundException(error.message, 'Donation no encontrado')
    }
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    try {
      const updateData: Partial<Donation> = {};

      // Asigna valores simples
      if (updateDonationDto.amount !== undefined) updateData.amount = updateDonationDto.amount;
      if (updateDonationDto.voucher !== undefined) updateData.voucher = updateDonationDto.voucher;
      if (updateDonationDto.observations !== undefined) updateData.observations = updateDonationDto.observations;

      // Transforma IDs en entidades
      if (updateDonationDto.idAnimalShelther !== undefined) {
        updateData.idAnimalShelther = await this.animalShelterRepository.findOneByOrFail({
          id: updateDonationDto.idAnimalShelther,
        });
      }

      if (updateDonationDto.idUser !== undefined) {
        updateData.idUser = await this.userRepository.findOneByOrFail({
          id: updateDonationDto.idUser,
        });
      }

      await this.donationRepository.update(id, updateData);
      return await this.donationRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message, 'Donation no encontrado');
    }
  }

  async remove(id: number) {
    try {
      const donationToDelete = await this.donationRepository.softDelete(id)
      if (donationToDelete.affected === 0) {
        throw new NotFoundException('Donation no encontrado');
      } else {
        return donationToDelete
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Donation no eliminado');
    }
  }

  async restore(id: number): Promise<Donation> {
    try {

      const result = await this.donationRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException('Donation no encontrado');
      }

      return this.donationRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Donation no Restaurado');
    }
  }
}
