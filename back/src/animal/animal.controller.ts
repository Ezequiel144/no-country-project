import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';

const entityName = 'Animal';
const itemxpega = 10;

@ApiTags('Animal')
@Controller('animal')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: AnimalDto })
  @ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido restaurado` })
  async restore(@Param('id') id: number): Promise<AnimalDto> {
    return this.animalService.restore(id);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animal',
      };
      const animal = await this.animalService.findActives(options);

      if (animal.items.length > 0) {
        return animal;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Animales no encontrados', error.message);
    }
  }

  @Get('/all')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animal/all',
      };
      const animal = await this.animalService.findAll(options);

      if (animal.items.length > 0) {
        return animal;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido modificado` })
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido eliminado` })
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }
}
