import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    @ApiProperty({
        description: "用户名",
        example: '11111'
    })
    readonly username: string;
    @Prop()
    @ApiProperty({
        description: "账号",
        example: '2222'
    })
    readonly account: string;
    @Prop()
    @ApiProperty({
        description: "密码",
        example: '111'
    })
    readonly password: string;
    @Prop()
    @ApiProperty({
        description: "盐",
        example: 'salt'
    })
    readonly salt?: string;
    @Prop()
    @ApiProperty({
        description: "手机号",
        example: '1361111'
    })
    readonly phone: string;
}