import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateReportStateDto } from './dto/create-reportstate.dto';
import { ReportStateAnimalDTO, ReportStateDto } from './dto/reportstate.dto';
import { UpdateReportStateDto } from './dto/update-reportstate.dto';
import { ReportState } from './entities/reportstate.entity';
import { plainToInstance } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ReportStateService {
  constructor(
    @InjectRepository(ReportState)
    private readonly reportStateRepository: Repository<ReportState>
  ) { }

  async create(createReportStateDto: CreateReportStateDto) {
    try {
      const resReportState = await this.reportStateRepository.findOne({
        where: { name: createReportStateDto.name },
      });

      if (resReportState) throw new BadRequestException('Tipo ya existe');
      const reportstate = this.reportStateRepository.create(createReportStateDto);
      await this.reportStateRepository.save(reportstate);
      return plainToInstance(ReportStateDto, reportstate);
    } catch (error) {
      throw new HttpException('Tipo no guardado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findActives(options: IPaginationOptions): Promise<Pagination<ReportStateDto>> {
    try {
      const queryBuilder = this.reportStateRepository.createQueryBuilder('reportstate');
      queryBuilder.orderBy('reportstate.createAt', 'ASC');

      const paginatedReportState = await paginate<ReportState>(queryBuilder, options);
      return new Pagination<ReportStateDto>(
        plainToInstance(ReportStateDto, paginatedReportState.items),
        paginatedReportState.meta, paginatedReportState.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<ReportStateDto>> {
    try {
      const queryBuilder = this.reportStateRepository.createQueryBuilder('user');
      queryBuilder.withDeleted();
      queryBuilder.orderBy('user.createAt', 'ASC');

      const paginatedReportState = await paginate<ReportState>(queryBuilder, options);
      return new Pagination<ReportStateDto>(
        plainToInstance(ReportStateDto, paginatedReportState.items),
        paginatedReportState.meta, paginatedReportState.links
      );
    } catch (error) {
      throw new BadRequestException(error.message, 'Tipos no encontrados')
    }
  }

  async findOne(id: number): Promise<ReportStateDto> {
    const reportstate = await this.reportStateRepository.findOne({
      where: {
        id
      } as FindOptionsWhere<ReportState>
    })
    try {
      if (!reportstate) throw new Error
      return reportstate;
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado')
    }
  }

  async findAnimals(id: number): Promise<ReportStateDto> {
    try {
      const reportstate = await this.reportStateRepository.findOne({
        where: {
          id
        } as FindOptionsWhere<ReportState>,
        relations: ['animals']  // Incluye la relación de los animales
      });
  
      if (!reportstate) throw new NotFoundException('Tipo no encontrado');
      
      return plainToInstance(ReportStateAnimalDTO, reportstate); // Convierte a DTO
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado');
    }
  }

  async update(id: number, updateReportStateDto: UpdateReportStateDto) {
    try {
      return this.reportStateRepository.update(id, updateReportStateDto);
    } catch (error) {
      throw new NotFoundException(error.message, 'Tipo no encontrado')
    }
  }

  async remove(id: number) {
    try {
      const ReportStateToDelete = await this.reportStateRepository.softDelete(id)
      if (ReportStateToDelete.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      } else {
        return ReportStateToDelete
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no eliminado');
    }
  }

  async restore(id: number): Promise<ReportState> {
    try {
      const result = await this.reportStateRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException('Tipo no encontrado');
      }
      return this.reportStateRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message, 'Tipo no Restaurado');
    }
  }
}
