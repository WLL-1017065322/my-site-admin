import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Articles extends Document {
    @Prop()
    // @ApiProperty({
    //     description: "内容",
    //     example: '11111',
    //     required: false,
    // })
    readonly content: String;
    @Prop()
    @ApiProperty({
        description: "标题",
        example: '2222',
        required: false,
    })
    readonly title: String;
    @Prop()
    readonly subhead: String;
    @Prop()
    readonly tags: String;
    @Prop()
    @ApiProperty({
        description: "作者",
        example: 'along',
        required: false,
    })
    readonly author: String;
    @Prop()
    readonly date: String;
    @Prop()
    readonly time: String;
    @Prop()
    readonly keywords: String;
    @Prop()
    @ApiProperty({
        description: "类型",
        example: 'code',
        required: false,
    })
    readonly type: String;
    @Prop()
    readonly pageView: String;
    @Prop()
    readonly image: String;
    @Prop()
    readonly comment: String;
    // @Prop()
    // _id: ObjectId;
}