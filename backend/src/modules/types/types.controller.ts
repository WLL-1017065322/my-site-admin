import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation,  } from '@nestjs/swagger';
import { AuthGuard } from "@nestjs/passport";
import { TypesService } from './types.service';
import { Types } from 'src/interface/types.interface';

@Controller('types')
export class TypesController {
    constructor(private readonly typesService: TypesService) { }
    @Get()
    @ApiOperation({
        summary: "获取types"
    })
    getTypes(@Query() query) {
        return this.typesService.queryTypes(query);
    }

    @Post()
    @ApiOperation({
        summary: "新增types"
    })
    insertType(@Body() typeDto: Types) {
        // insertType(@Body() body) {
        console.log('typeDto', typeDto);
        return this.typesService.insertTypes(typeDto);
    }

    @Put()
    @ApiOperation({
        summary: "修改types"
    })
    updateType(@Body() typeDto: Types) {
        // insertType(@Body() body) {
        // console.log('typeDto',typeDto);
        return this.typesService.updateType(typeDto);
    }

    @Delete()
    @ApiOperation({
        summary: "修改types"
    })
    delType(@Body() typeDto: Types) {
        // insertType(@Body() body) {
        console.log('typeDto', typeDto);
        return this.typesService.delType(typeDto._id);
    }
}
