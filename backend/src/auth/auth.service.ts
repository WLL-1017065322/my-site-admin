import { Injectable, Logger, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';
import { JwtService } from '@nestjs/jwt'
const logger = new Logger('auth.service')

@Injectable()
export class AuthService {
    private response: IResponse
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    /**
     * 
     * @param user
     *  
     */
    private async validateUser(user: User) {
        console.log('user',user);
        const account: string = user.account
        const password: string = user.password
        return this.userService.findOneByAccount(account)
            .then(res => {
                console.log('res',res);
                if (res.length === 0) {
                    this.response = {
                        code: 3,
                        errMsg: '用户尚未注册'
                    }
                    throw this.response
                }
                return res[0]
            })
            .then((dbUser: User) => {
                const pass = encript(password, dbUser.salt);
                // console.log('pass',pass,dbUser,password);
                if (pass === dbUser.password) {
                    return this.response = {
                        code: 0, data: {
                            uid: dbUser._id
                        }
                    }
                } else {
                    return this.response = { code: 4, errMsg: '用户名密码错误' }
                }
            })
            .catch(err => err)
    }

    public async login(user: User) {
        return await this.validateUser(user)
            .then(async (res: IResponse) => {
                if (res.code !== 0) {
                    this.response = res;
                    throw this.response
                }
                const userid = res.data.userid
                return this.response = { code: 0, data: { token: await this.createToken(user), userid } }
            })
            .catch(err => err)
    }
    /**
     * @description 注册
     * @Date 2021-11-02 00:12:55 
     * @param user 
     * @returns {*}
     */
    async register(user: User) {
        return this.userService.findOneByAccount(user.account)
            .then((res) => {
                if (res && res.length > 0) {
                    // throw Error("用户已注册")
                    this.response = {
                        code: 1,
                        errMsg: '用户已注册'
                    }
                    throw this.response
                }
            })
            .then(async () => {
                try {
                    const createUser = new this.userModel(user)
                    console.log('user',user);
                    const resp = await createUser.save()
                    this.response = {
                        code: 0,
                    }
                    return this.response
                } catch (error) {
                    this.response = {
                        code: 2,
                        errMsg: '用户注册失败，错误详情' + error
                    }
                    throw this.response
                    // throw Error("保存用户失败" + error);
                }
            })
            .catch(err => {
                logger.log(`${user.account}：${err.msg}`)
                return this.response
            })
            .finally(() => {
                // return this.response
            })
    }

    public async alter(user: User) {
        // return this.userService.findOneByAccount(user.account).then(async () => {
        //         return await this.userModel.findOneAndUpdate({ account: user.account }, user, {}, () => {
        //             logger.log(`用户${user.account}修改密码成功`)
        //         }).then(() => {
        //             return (this.response = { code: 0, msg: '用户修改成功' })
        //         })
        //     })
        const resp = await this.userService.findOneByAccount(user.account)
        if (resp.length > 0) {
            const _resp = await this.userModel.findOneAndUpdate({ account: user.account }, user)
            if (_resp) {
                logger.log(`用户${user.account}修改密码成功`)
                return (this.response = { code: 0, errMsg: '用户修改成功' })
            }
        }
        return (this.response = { code: 1, errMsg: '用户修改失败' })
    }


    private async createToken(user: User) {
        return await this.jwtService.sign(user)
    }
}
