import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Tags } from "src/interface/tags.interface";
export const TagsSchema = SchemaFactory.createForClass(Tags)