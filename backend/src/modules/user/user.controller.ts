import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards, } from "@nestjs/common";
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

    @Get('list')
    @ApiOperation({
        summary: "获取用户列表"
    })
    getList(@Query('id') id) {
        console.log('获取用户列表', id);
        return this.userService.queryAll(id)
    }

    @Post()
    @ApiOperation({
        summary: "新增用户"
    })
    add(@Body() user) {
        console.log('获取用户列表', user);
        return this.userService.addUser(user)
    }
    @Post()
    @ApiOperation({
        summary: "修改用户"
    })
    put(@Body() user) {
        console.log('获取用户列表', user);
        return this.userService.putUser(user)
    }
    @Post()
    @ApiOperation({
        summary: "删除用户"
    })
    del(@Body('id') id) {
        console.log('获取用户列表', id);
        return this.userService.delUser(id)
    }
}