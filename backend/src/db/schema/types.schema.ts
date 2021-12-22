import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Types } from "src/interface/types.interface";
export const TypesSchema = SchemaFactory.createForClass(Types)