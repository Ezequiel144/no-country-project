import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user-dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserRole } from './user-role.enum';
import { Roles } from '../common/decorators/roles.decorator';

const entityName = 'Usuario'
const itemxpega = 10

@ApiTags('Users')
@Controller('users')
@ApiCreatedResponse({ description: `El ${entityName} ha sdio agregado` })
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('restore/:id')
    @Roles(UserRole.ADMIN)
    async restore(@Param('id') id: number): Promise<UserDto> {
        return this.userService.restore(id);
    }

    @Get()
    @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
    @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
    async findActives(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = itemxpega,
    ): Promise<Pagination<UserDto>> {
        try {
            const options = {
                page,
                limit,
                route: '/users',
            };
            const users = await this.userService.findActives(options);

            if (users.items.length > 0) {
                return users;
            } else {
                throw new Error();
            }
        } catch (error) {
            throw new NotFoundException('Usuarios no encontrados', error.message);
        }
    }

    @Get('/pendingacceptance')
    @Roles(UserRole.ADMIN)
    @ApiQuery({ name: "page", description: 'Numero de la pagina que quiero que me devuelva, por defecto es la pagina 1', type: 'number', required: false })
    @ApiQuery({ name: "limit", description: `Cantidad de registros a devolver, por pagina devuelve ${itemxpega} sino se envia`, type: 'number', required: false })
    async findPendingAcceptance(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = itemxpega,
    ): Promise<Pagination<UserDto>> {
        try {
            const options = {
                page,
                limit,
                route: '/users',
            };
            const users = await this.userService.findPendingAcceptance(options);

            if (users.items.length > 0) {
                return users;
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
    ): Promise<Pagination<UserDto>> {
        try {
            const options = {
                page,
                limit,
                route: '/users/all',
            };
            const users = await this.userService.findAll(options);

            if (users.items.length > 0) {
                return users;
            } else {
                throw new Error();
            }
        } catch (error) {
            throw new NotFoundException('Usuarios no encontrados', error.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Get(':username')
    findOneByUsername(@Param('username') username: string) {
        return this.userService.findOneByUsername(username);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
