import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keywords } from 'src/interface/keywords.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class KeywordsService {
    constructor(@InjectModel('Keywords') private readonly keywordsModel: Model<Keywords>) { }
    async queryKeywords(params) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            console.log(params._id.trim());
            if (params && params._id.trim() !== '' && !ObjectId.isValid(params._id)) {
                return {
                    code: 1,
                    errMsg: `oid格式不正确`
                }
            }
            if (params && params._id.trim() !== '') {
                params._id = new ObjectId(params._id);
            } else {
                params = {}
            }
            console.log(params, 'params');
            const data = await this.keywordsModel.find(params)
            return {
                code: 0,
                data
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }

    }

    async insertKeywords(body) {
        try {
            const data = await this.keywordsModel.create(body)
            console.log('insert===', data);
            return {
                code: 0,
                msg: '新增成功'
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error
            }
        }

    }

    async updateKeyword(body) {
        let keyword = { ...body }
        const ObjectId = mongoose.Types.ObjectId;
        const _id = new ObjectId(keyword._id)
        delete keyword._id;
        try {
            const data = await this.keywordsModel.findByIdAndUpdate(_id, keyword);
            if (data) {
                return {
                    code: 0
                }
            } else {
                return {
                    code: 1,
                    errMsg: '更新失败'
                }
            }
        } catch (error) {
            return {
                code: 1,
                errMsg: `更新失败: ${error}`
            }
        }
    }

    // 删除
    async delKeyword(id) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            const _id = new ObjectId(id)
            const data = await this.keywordsModel.findByIdAndDelete(_id);
            return {
                code: 0
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: `删除失败:${error} `
            }
        }

    }

    async getKeywordsNumber() {
        try {
            const data = await this.keywordsModel.find();
            console.log('data',data.length);
            return data.length
        } catch (error) {
            console.log(error);
            return 0
        }
    }
}
