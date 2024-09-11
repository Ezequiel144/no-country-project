import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { AdoptionDto } from './dto/adoption.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';

const entityName = 'Adoption';
const itemxpega = 10;

@ApiTags('Adoption')
@Controller('adoption')
@ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiBody({ type: AdoptionDto })
  @ApiCreatedResponse({ description: `El ${entityName} ha sido agregado` })
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.create(createAdoptionDto);
  }

  @Post('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido restaurado` })
  async restore(@Param('id') id: number): Promise<AdoptionDto> {
    return this.adoptionService.restore(id);
  }

  @Get()
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findActives(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AdoptionDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/adoption',
      };
      const adoption = await this.adoptionService.findActives(options);

      if (adoption.items.length > 0) {
        return adoption;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Adoptiones no encontrados', error.message);
    }
  }

  @Get('/all')
  @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
  @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = itemxpega,
  ): Promise<Pagination<AdoptionDto>> {
    try {
      const options = {
        page,
        limit,
        route: '/adoption/all',
      };
      const adoption = await this.adoptionService.findAll(options);

      if (adoption.items.length > 0) {
        return adoption;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('Usuarios no encontrados', error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adoptionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido modificado` })
  update(@Param('id') id: string, @Body() updateAdoptionDto: UpdateAdoptionDto) {
    return this.adoptionService.update(+id, updateAdoptionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: `El ${entityName} ha sido eliminado` })
  remove(@Param('id') id: string) {
    return this.adoptionService.remove(+id);
  }
}
