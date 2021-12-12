import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tags } from 'src/interface/tags.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class TagsService {
    constructor(@InjectModel("Tags") private readonly tagsModel: Model<Tags>) {

    }

    async queryTags(params) {
        console.log('param', params);
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
            const data = await this.tagsModel.find(params)
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

    async insertTags(body) {
        try {
            const data = await this.tagsModel.create(body)
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

    async updateTag(body) {
        let tag = { ...body }
        const ObjectId = mongoose.Types.ObjectId;
        const _id = new ObjectId(tag._id)
        delete tag._id;
        try {
            const data = await this.tagsModel.findByIdAndUpdate(_id, tag);
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
    async delTag(id) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            const _id = new ObjectId(id)
            const data = await this.tagsModel.findByIdAndDelete(_id);
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
    // 查询
    async getTagsNumber() {
        try {
            const data = await this.tagsModel.find();
            return data.length
        } catch (error) {
            return 0
        }
    }

}
