import { Body, Controller, Get, Post, } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/interface/user.interface";
import { UserService } from "./user.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    index() {
        return this.userService.userInfo()
        // return '1'
    }
    @Post('register')
    @ApiOperation({
        summary: "注册"
    })
    async getUsername(@Body() userDto: User) {
        return await this.userService.register(userDto)
        // return this.userService.userInfo()
    }
}