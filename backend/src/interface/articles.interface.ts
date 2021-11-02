import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Articles extends Document {
    @Prop()
    @ApiProperty({
        description: "内容",
        example: '11111'
    })
    readonly content: String;
    @Prop()
    @ApiProperty({
        description: "标题",
        example: '2222'
    })
    readonly title: String;
    readonly subhead: String;
    readonly tags: String;
    readonly author: String;
    readonly date: String;
    readonly time: String;
    readonly keywords: String;
    readonly type: String;
    readonly pageView: String;
    readonly image: String;
    readonly comment: String;
}