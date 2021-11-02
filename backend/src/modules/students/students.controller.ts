import { Controller, Get, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudentsService } from "./students.service";
// import { CommonRedisService } from "src/common/commonRedis.service";

// 在对应的控制器中调用服务

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {
    }

    @Get()
    @ApiTags('students')
    index() {
        return this.studentsService.studentsInfo()
    }
    // @Get('setredis')
    // async setRedis() {
    //     await this.commonRedisService.set('user', 'ceshi', 100)
    //     return
    // }
    // @Get('getredis')
    // async getRedis() {
    //     const data = await this.commonRedisService.get('user')
    //     return data
    // }
}