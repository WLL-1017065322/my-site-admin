import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Types extends Document {
    @Prop()
    @ApiProperty({
        description: "分类",
        example: 'code',
        required: false,
    })
    readonly type: String;
    // @Prop()
    // _id: ObjectId;
}