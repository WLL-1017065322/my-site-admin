import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Articles } from 'src/interface/articles.interface';
import { Keywords } from 'src/interface/keywords.interface';
import { SystemInfo } from 'src/interface/systemInfo.interface';
import { Tags } from 'src/interface/tags.interface';
import { InfoService } from '../info/info.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Keywords') private readonly keywordsModel: Model<Keywords>,
        @InjectModel('Tags') private readonly tagsModel: Model<Tags>,
        @InjectModel("SystemInfo") private readonly systemModel: Model<SystemInfo>,
        @InjectModel('Articles') private readonly articlesModel: Model<Articles>,
        private readonly infoService: InfoService
    ) {

    }
    async queryHome(query) {
        try {
            console.log(1);
            const keywordsList = await this.keywordsModel.find()
            const tagsList = await this.tagsModel.find()
            // const systemInfo = await this.systemModel.find()
            // const articleList = await this.articlesModel.find()
            const resp = await this.infoService.getAllInfo()
            const allInfo = resp.data
            return {
                code: 0,
                data: {
                    keywordsList,
                    tagsList,
                    allInfo
                }
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: '系统错误'
            }
        }

    }
}
