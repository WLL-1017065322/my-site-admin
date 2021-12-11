import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Keywords } from 'src/interface/keywords.interface';
import { KeywordsService } from './keywords.service';
import { AuthGuard } from "@nestjs/passport";

@Controller('keywords')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@ApiTags("keywords")
export class KeywordsController {
    constructor(private readonly keywordsService: KeywordsService) {

    }

    @Get()
    @ApiOperation({
        summary: "获取keywords"
    })
    getKeywords(@Query() query) {
        return this.keywordsService.queryKeywords(query);
    }

    @Post()
    @ApiOperation({
        summary: "新增keywords"
    })
    insertKeyword(@Body() keywordDto: Keywords) {
        // insertKeyword(@Body() body) {
        // console.log('keywordDto',keywordDto);
        return this.keywordsService.insertKeywords(keywordDto);
    }

    @Put()
    @ApiOperation({
        summary: "修改keywords"
    })
    updateKeyword(@Body() keywordDto: Keywords) {
        // insertKeyword(@Body() body) {
        // console.log('keywordDto',keywordDto);
        return this.keywordsService.updateKeyword(keywordDto);
    }

    @Delete()
    @ApiOperation({
        summary: "修改keywords"
    })
    delKeyword(@Body() keywordDto: Keywords) {
        // insertKeyword(@Body() body) {
        // console.log('keywordDto',keywordDto);
        return this.keywordsService.delKeyword(keywordDto._id);
    }
}
