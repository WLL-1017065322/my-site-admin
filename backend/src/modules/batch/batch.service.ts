import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Articles } from 'src/interface/articles.interface';

@Injectable()
export class BatchService {
    constructor(@InjectModel('Articles') private readonly articlesModel: Model<Articles>) {
    }
    // async articlesInfo() {
    //     // return "111"
    //     return await this.articlesModel.find().exec();
    // }
}
