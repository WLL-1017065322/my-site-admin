import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Keywords } from "src/interface/keywords.interface";
export const KeywordsSchema = SchemaFactory.createForClass(Keywords)