import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemInfo } from 'src/interface/systemInfo.interface';
import { ArticlesService } from '../articles/articles.service';

import { KeywordsService } from '../keywords/keywords.service'
import { TagsService } from '../tags/tags.service';
import { UserService } from '../user/user.service';
@Injectable()
export class InfoService {
    constructor(private readonly keywordsService: KeywordsService,
        private readonly articlesService: ArticlesService,
        private readonly userService: UserService,
        private readonly tagsService: TagsService,
        @InjectModel("SystemInfo") private readonly systemModel: Model<SystemInfo>
    ) { }

    async getAllInfo() {
        const keywordsNums = await this.keywordsService.getKeywordsNumber();
        const articleNums = await this.articlesService.getArticlesNumber();
        const userNums = await this.userService.getUsersNumber();
        const tagNums = await this.tagsService.getTagsNumber();
        // const runTime = await this.keywordsService.getKeywordsNumber();
        const systemInfo = await this.systemModel.findOne();
        const createTime = systemInfo.createTime;
        console.log('keywordsNums', keywordsNums);
        return {
            code: 0,
            data: {
                keywordsNums,
                articleNums,
                userNums,
                tagNums,
                createTime
            }
        }
    }

    async createSystemInfo(param) {
        const data = await this.systemModel.create(param)
        return {
            code: 0,
            data: data
        }
    }

}
