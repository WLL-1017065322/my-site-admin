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
}