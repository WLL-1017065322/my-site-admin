import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Keywords extends Document {
    @Prop()
    @ApiProperty({
        description: "关键词",
        example: 'javascript',
        required: false,
    })
    readonly keyword: String;
    // @Prop()
    // _id: ObjectId;
}