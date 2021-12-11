import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from "@nestjs/passport";

import { Tags } from 'src/interface/tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@ApiTags("tags")

export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    @ApiOperation({
        summary: "获取tags"
    })
    getTags(@Query() query) {
        return this.tagsService.queryTags(query);
    }

    @Post()
    @ApiOperation({
        summary: "新增tags"
    })
    insertTag(@Body() tagDto: Tags) {
        // insertTag(@Body() body) {
        console.log('tagDto',tagDto);
        return this.tagsService.insertTags(tagDto);
    }

    @Put()
    @ApiOperation({
        summary: "修改tags"
    })
    updateTag(@Body() tagDto: Tags) {
        // insertTag(@Body() body) {
        // console.log('tagDto',tagDto);
        return this.tagsService.updateTag(tagDto);
    }

    @Delete()
    @ApiOperation({
        summary: "修改tags"
    })
    delTag(@Body() tagDto: Tags) {
        // insertTag(@Body() body) {
        console.log('tagDto',tagDto);
        return this.tagsService.delTag(tagDto._id);
    }
}
