import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, NotFoundException, Put } from '@nestjs/common';
import { ReportStateService } from './reportstate.service';
import { CreateReportStateDto } from './dto/create-reportstate.dto';
import { ReportStateDto } from './dto/reportstate.dto';
import { UpdateReportStateDto } from './dto/update-reportstate.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';

const entityName = 'Reporte de Estado';
const itemxpega = 10;

@ApiTags('Report State')
@Controller('reportstate')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class ReportStateController {
  constructor(private readonly reportStateService: ReportStateService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ReportStateDto })
  async create(@Body() createReportStateDto: CreateReportStateDto) {
    return this.reportStateService.create(createReportStateDto);
  }

  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido restaurado` })
  async restore(@Param('id') id: number): Promise<ReportStateDto> {
    return this.reportStateService.restore(id);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<ReportStateDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/reportstate',
      };
      const reportstate = await this.reportStateService.findActives(options);

      if (reportstate.items.length > 0) {
        return reportstate;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Reporte Estado  no encontrados', error.message);
    }
  }

  @Get('/all')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<ReportStateDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/reportstate/all',
      };
      const reportstate = await this.reportStateService.findAll(options);

      if (reportstate.items.length > 0) {
        return reportstate;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Reporte Estado no encontrados', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reportStateService.findOne(id);
  }

  @Get('/animals/:id')
  async findAnimals(@Param('id') id: number) {
    return this.reportStateService.findAnimals(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido modificado` })
  async update(@Param('id') id: number, @Body() updateReportStateDto: UpdateReportStateDto) {
    return this.reportStateService.update(id, updateReportStateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido eliminado` })
  async remove(@Param('id') id: number) {
    return this.reportStateService.remove(id);
  }
}
