import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Tags extends Document {
    @Prop()
    @ApiProperty({
        description: "标签",
        example: 'javascript',
        required: false,
    })
    readonly tag: String;
    // @Prop()
    // _id: ObjectId;
}