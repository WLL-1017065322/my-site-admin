import { Body, Controller, Delete, Request, Get, Post, Put, Query, SetMetadata, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
// import { AuthGuard } from "src/guards/auth.guard";
import { AuthGuard } from '@nestjs/passport';

import { User } from "src/interface/user.interface";
import { Role } from "src/role/role.decorator";
import { UserService } from "./user.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@ApiTags('users')
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
        console.log('新增用户', user);
        return this.userService.addUser(user)
    }
    @Put()
    @ApiOperation({
        summary: "修改用户"
    })
    put(@Body() user) {
        console.log('修改用户', user);
        return this.userService.putUser(user)
    }
    @Delete()
    @ApiOperation({
        summary: "删除用户"
    })
    del(@Body('id') id) {
        console.log('删除用户', id);
        return this.userService.delUser(id)
    }

    @Get('/info')
    @ApiOperation({
        summary: "获取登录用户信息"
    })
    getLoginer(@Request() req) {
        console.log('登录用户', req.user);
        return this.userService.findLoginerById(req.user.userId)
    }

    @Put('/info')
    @ApiOperation({
        summary: "修改登录的用户信息"
    })
    modifyLoginer(@Request() req) {
        console.log('修改用户', req.user, req.body);
        return this.userService.modifyLoginerById(req.user.userId, req.body)
    }
}