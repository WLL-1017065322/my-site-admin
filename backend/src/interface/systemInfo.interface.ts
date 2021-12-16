import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class SystemInfo extends Document {
    @Prop()
    @ApiProperty({
        description: "创建时间",
    })
    readonly createTime: string;
    @Prop()
    @ApiProperty({
        description: "博客作者",
    })
    readonly author: string;
    @Prop()
    @ApiProperty({
        description: "座右铭",
    })
    readonly motto: string;
    @Prop()
    @ApiProperty({
        description: "qq",
    })
    readonly qq: string;
    @Prop()
    @ApiProperty({
        description: "微信",
    })
    readonly wechat: string;
}