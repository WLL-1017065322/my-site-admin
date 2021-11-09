import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @ApiOperation({
        summary: '用户登录'
    })
    public async login(@Body() userDto: User) {
        return await this.authService.login(userDto)
    }

    @Post('register')
    @ApiOperation({
        summary: "注册"
    })
    async getUsername(@Body() userDto: User) {
        return await this.authService.register(userDto)
        // return this.userService.userInfo()
    }

    @Post('alter')
    @ApiOperation({
        summary: "用户修改接口"
    })
    async alterUser(@Body() userDto: User) {
        return await this.authService.alter(userDto)
        // return this.userService.userInfo()
    }
}
