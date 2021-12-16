import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InfoService } from './info.service';

@Controller('info')
@ApiTags("sysinfo")
export class InfoController {
    constructor(private readonly infoService: InfoService) { }

    @Get()
    @ApiOperation({
        summary: "获取信息"
    })
    getInfo() {
        return this.infoService.getAllInfo();
    }

    @Post()
    @ApiOperation({
        summary: '添加信息'
    })
    createSystemInfo() {
        return this.infoService.createSystemInfo({ createTime: '20211111', author: 'along', motto: '欲买桂花同载酒，终不似，少年游。' })
    }

    @Put()
    @ApiOperation({
        summary: '修改信息'
    })
    updateSystemInfo(@Body() body) {
        return this.infoService.updateSystemInfo(body)
    }
}
