import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Articles } from 'src/interface/articles.interface';
import { ArticlesService } from '../articles/articles.service';
import { BlogService } from './blog.service';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService, private readonly articleService: ArticlesService) {

    }

    @Get()
    @ApiOperation({
        summary: "获取文章列表"
    })
    getList(@Query() articleDto: Articles) {
        console.log('获取文章列表', articleDto);
        return this.articleService.queryAll(articleDto)
    }

    @Get('home')
    @ApiOperation({
        summary: "获取首页信息"
    })
    getHome(@Query() query) {
        console.log('获取首页信息', query);
        console.log(111);
        return this.blogService.queryHome(query)
    }

    @Get("detail/:id")
    @ApiOperation({
        summary: "获取文章具体信息"
    })
    getDetail(@Param() params) {
        console.log(params.id);
        return this.articleService.queryDetail(params.id);
    }



}
