import { SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Articles } from "src/interface/articles.interface";

// export const ArticlesSchema = new mongoose.Schema({
//     content: String,
//     title: String,
//     subhead: String,
//     tags: String,
//     author: String,
//     date: String,
//     time: String,
//     keywords: String,
//     type: String,
//     pageView: String,
//     image: String,
//     comment: String,
// })

export const ArticlesSchema = SchemaFactory.createForClass(Articles)