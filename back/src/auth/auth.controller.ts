// src/auth/auth.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';

const entityName = 'Autenticacion'

@ApiTags('Authentication')
@Controller('auth')
@ApiForbiddenResponse({ description: `${entityName} no autorizado` })
@ApiBadRequestResponse({ description: 'Los datos enviados son incorrectos' })
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.loginWithCredentials(username, password);
    }

    @Post('refresh')
    async refreshToken(@Body('refresh_token') refreshToken: string, @Req() req) {
        const userId = req.user.id; // obtener el ID del usuario desde el access token anterior (JWT)
        return this.authService.refreshToken(userId, refreshToken);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    async logout(@Req() req) { 
        const userId = req.user.userId;
        return this.authService.logout(userId);
    }
}
