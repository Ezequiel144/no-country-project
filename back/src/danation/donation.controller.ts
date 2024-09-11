import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationDto } from './dto/donation.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';

const entityName = 'Donation';
const itemxpega = 10;

@ApiTags('Donation')
@Controller('donation')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: DonationDto })
  @ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationService.create(createDonationDto);
  }

  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido restaurado` })
  async restore(@Param('id') id: number): Promise<DonationDto> {
    return this.donationService.restore(id);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<DonationDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/donation',
      };
      const donation = await this.donationService.findActives(options);

      if (donation.items.length > 0) {
        return donation;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Donationes no encontrados', error.message);
    }
  }

  @Get('/all')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<DonationDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/donation/all',
      };
      const donation = await this.donationService.findAll(options);

      if (donation.items.length > 0) {
        return donation;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.donationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido modificado` })
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
    return this.donationService.update(+id, updateDonationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido eliminado` })
  remove(@Param('id') id: string) {
    return this.donationService.remove(+id);
  }
}
