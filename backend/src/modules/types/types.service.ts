import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'src/interface/types.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class TypesService {
    constructor(@InjectModel("Types") private readonly typesModel: Model<Types>) {

    }

    async queryTypes(params) {
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
            const data = await this.typesModel.find(params)
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

    async insertTypes(body) {
        try {
            const data = await this.typesModel.create(body)
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

    async updateType(body) {
        let type = { ...body }
        const ObjectId = mongoose.Types.ObjectId;
        const _id = new ObjectId(type._id)
        delete type._id;
        try {
            const data = await this.typesModel.findByIdAndUpdate(_id, type);
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
    async delType(id) {
        try {
            const ObjectId = mongoose.Types.ObjectId;
            const _id = new ObjectId(id)
            const data = await this.typesModel.findByIdAndDelete(_id);
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
    // // 查询
    // async getTypesNumber() {
    //     try {
    //         const data = await this.typesModel.find();
    //         return data.length
    //     } catch (error) {
    //         return 0
    //     }
    // }

}
