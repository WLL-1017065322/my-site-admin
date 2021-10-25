import * as mongoose from "mongoose";

export const ArticlesSchema = new mongoose.Schema({
    content: String,
    title: String,
    subhead: String,
    tags: String,
    author: String,
    date: String,
    time: String,
    keywords: String,
    type: String,
    pageView: String,
    image: String,
    comment: String,
})