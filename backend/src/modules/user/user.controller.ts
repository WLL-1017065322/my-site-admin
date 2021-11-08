import { Body, Controller, Get, Post, SetMetadata, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
// import { AuthGuard } from "src/guards/auth.guard";
import { AuthGuard } from '@nestjs/passport';

import { User } from "src/interface/user.interface";
import { Role } from "src/role/role.decorator";
import { UserService } from "./user.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@ApiTags('user')
// @UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    index() {
        return this.userService.userInfo()
        // return '1'
    }


    @Get('hello')
    // @SetMetadata('roles',['admin'])
    @Role('admin')
    // @UseGuards(AuthGuard('jwt'))
    hello() {
        return 'helloworld'
        // return this.userService.helloRedis()
        // return '1'
    }
}