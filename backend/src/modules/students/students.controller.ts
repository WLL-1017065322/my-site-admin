import { Controller, Get, } from "@nestjs/common";
import { StudentsService } from "./students.service";
// 在对应的控制器中调用服务

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {
    }

    @Get()
    index() {
        return this.studentsService.studentsInfo()
    }
}