import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, NotFoundException, Put } from '@nestjs/common';
import { AnimalFeaturesService } from './animalfeatures.service';
import { CreateAnimalFeaturesDto } from './dto/create-animalfeatures.dto';
import { AnimalFeaturesDto } from './dto/animalfeatures.dto';
import { UpdateAnimalFeaturesDto } from './dto/update-animalfeatures.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';

const entityName = 'Tipo de Caracteristica';
const itemxpega = 10;

@ApiTags('Animal Features')
@Controller('animalfeatures')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class AnimalFeaturesController {
  constructor(private readonly animalFeaturesService: AnimalFeaturesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: AnimalFeaturesDto })
  async create(@Body() createAnimalFeaturesDto: CreateAnimalFeaturesDto) {
    return this.animalFeaturesService.create(createAnimalFeaturesDto);
  }

  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido restaurado` })
  async restore(@Param('id') id: number): Promise<AnimalFeaturesDto> {
    return this.animalFeaturesService.restore(id);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalFeaturesDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animalfeatures',
      };
      const animalfeatures = await this.animalFeaturesService.findActives(options);

      if (animalfeatures.items.length > 0) {
        return animalfeatures;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get('/all')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalFeaturesDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animalfeatures/all',
      };
      const animalfeatures = await this.animalFeaturesService.findAll(options);

      if (animalfeatures.items.length > 0) {
        return animalfeatures;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.animalFeaturesService.findOne(id);
  }

  @Get('/animals/:id')
  async findAnimals(@Param('id') id: number) {
    return this.animalFeaturesService.findAnimals(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido modificado` })
  async update(@Param('id') id: number, @Body() updateAnimalFeaturesDto: UpdateAnimalFeaturesDto) {
    return this.animalFeaturesService.update(id, updateAnimalFeaturesDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido eliminado` })
  async remove(@Param('id') id: number) {
    return this.animalFeaturesService.remove(id);
  }
}
