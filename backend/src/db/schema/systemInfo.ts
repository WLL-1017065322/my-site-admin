import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { SystemInfo } from "src/interface/systemInfo.interface";
export const SystemInfoSchemal = SchemaFactory.createForClass(SystemInfo)