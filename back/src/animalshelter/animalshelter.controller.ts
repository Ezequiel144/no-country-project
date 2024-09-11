import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AnimalShelterService } from './animalshelter.service';
import { CreateAnimalShelterDto } from './dto/create-animalshelter.dto';
import { AnimalShelterDto } from './dto/animalshelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animalshelter.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

const entityName = 'Refugio';
const itemxpega = 10;

@ApiTags('Animal Shelter')
@Controller('animalshelter')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class AnimalShelterController {
  constructor(private readonly animalShelterService: AnimalShelterService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  create(@Body() createAnimalShelterDto: CreateAnimalShelterDto) {
    return this.animalShelterService.create(createAnimalShelterDto);
  }
  
  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async restore(@Param('id') id: number): Promise<AnimalShelterDto> {
    return this.animalShelterService.restore(id);
  }

  @Post(':animalShelterId/to/:animalTypesId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiParam({ name: "animalShelterId", description: 'Id de Animal Shelter (Refugio)', type: 'number', required: true })
  @ApiParam({ name: "animalTypesId", description: 'Id de Tipo (Identifica el tipo de Animal)', type: 'number', required: true })
  async addAnimalTypeToAnimalShelter(
    @Param('animalShelterId') animalShelterId: number,
    @Param('animalTypesId') animalTypesId: number,
  ) {
    return this.animalShelterService.addAnimalTypeToAnimalShelter(animalShelterId, animalTypesId);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalShelterDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animaltypes',
      };
      const animalshelter = await this.animalShelterService.findActives(options);

      if (animalshelter.items.length > 0) {
        return animalshelter;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get('/pendingacceptance')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findPendingAcceptance(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AnimalShelterDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animaltypes',
      };
      const animalshelter = await this.animalShelterService.findPendingAcceptance(options);

      if (animalshelter.items.length > 0) {
        return animalshelter;
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
  ): Promise<Pagination<AnimalShelterDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/animaltypes/all',
      };
      const animalshelter = await this.animalShelterService.findAll(options);

      if (animalshelter.items.length > 0) {
        return animalshelter;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Refugios no encontrados', error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalShelterService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  update(@Param('id') id: number, @Body() updateAnimalShelterDto: UpdateAnimalShelterDto) {
    return this.animalShelterService.update(id, updateAnimalShelterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.animalShelterService.remove(+id);
  }
}
