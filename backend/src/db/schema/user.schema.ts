import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { User } from "src/interface/user.interface";
export const UserSchema = SchemaFactory.createForClass(User)