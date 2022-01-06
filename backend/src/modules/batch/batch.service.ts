import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Articles } from 'src/interface/articles.interface';
import { ArticlesService } from '../articles/articles.service';
import { readdirSync, readFile, readFileSync, writeFile } from 'fs';
import { join, resolve } from 'path';
@Injectable()
export class BatchService {
    constructor(
        private readonly articlesService: ArticlesService,
        @InjectModel('Articles') private readonly articlesModel: Model<Articles>) {
    }
    // async articlesInfo() {
    //     // return "111"
    //     return await this.articlesModel.find().exec();
    // }

    getMarkdownsList() {
        const filePath = resolve(process.cwd(), 'public/blog')
        // console.log(filePath);
        const fileLists = readdirSync(filePath);
        const dataList = [];
        fileLists.forEach((item, index) => {
            // console.log('item', item);
            const splitList = item.split('.')
            // console.log('splitList', splitList);
            let newStr, msg, title, newStrReplace
            if (splitList[splitList.length - 1] === 'md') {
                title = item.replace('.md', '')
                const itemContent = readFileSync(`${filePath}/${item}`)
                // console.log('itemContent', itemContent);
                newStr = itemContent.toString();
                newStrReplace = newStr.replace(/(\[\^_\^\]:).*?(\[\^_\^\])/g, '')
                // const regex = /(?<=\|).*?(?=\|)/g
                // const regex =  /(?<=([^_^]:)).*?(?=([^_^]))/g
                const regex = /(?<=\[\^_\^\]:).*?(?=\[\^_\^\])/g
                const arr = newStr.match(regex)
                if (index === 0) {
                    console.log('msg', arr);
                }
                if (arr && arr.length > 0) {
                    msg = JSON.parse(arr[0])
                }
                dataList.push({
                    content: newStrReplace,
                    ...msg,
                    title
                })
            }

            // readFileSync(`${filePath}/${item}`, (err, data) => {
            //     if (err) {
            //         console.log('文件不存在');
            //     } else {
            //         // console.log('data',data);
            //         console.log('datatostring', data.toString());
            //         const newStr = data.toString();
            //         const regex = /(?<=\|).*?(?=\|)/g
            //         const arr = newStr.match(regex)||[]
            //         console.log('====', arr);
            //         return {
            //             content: arr[0]||''
            //         }
            //         // const str = marked(data.toString());
            //         // console.log('str',str);
            //     }
            // })
        })
        return dataList
    }

    async queryList() {
        try {
            // const filePath = resolve(process.cwd(), 'public/blog')
            // // console.log(filePath);
            // const fileLists = readdirSync(filePath);
            // const dataList = [];
            // fileLists.forEach((item, index) => {
            //     // console.log('item', item);
            //     const splitList = item.split('.')
            //     // console.log('splitList', splitList);
            //     let newStr, msg, title, newStrReplace
            //     if (splitList[splitList.length - 1] === 'md') {
            //         title = item.replace('.md', '')
            //         const itemContent = readFileSync(`${filePath}/${item}`)
            //         // console.log('itemContent', itemContent);
            //         newStr = itemContent.toString();
            //         newStrReplace = newStr.replace(/(\[\^_\^\]:).*?(\[\^_\^\])/g, '')
            //         // const regex = /(?<=\|).*?(?=\|)/g
            //         // const regex =  /(?<=([^_^]:)).*?(?=([^_^]))/g
            //         const regex = /(?<=\[\^_\^\]:).*?(?=\[\^_\^\])/g
            //         const arr = newStr.match(regex)
            //         if (index === 0) {
            //             console.log('msg', arr);
            //         }
            //         if (arr && arr.length > 0) {
            //             msg = JSON.parse(arr[0])
            //         }
            //         dataList.push({
            //             content: newStrReplace,
            //             ...msg,
            //             title
            //         })
            //     }

            //     // readFileSync(`${filePath}/${item}`, (err, data) => {
            //     //     if (err) {
            //     //         console.log('文件不存在');
            //     //     } else {
            //     //         // console.log('data',data);
            //     //         console.log('datatostring', data.toString());
            //     //         const newStr = data.toString();
            //     //         const regex = /(?<=\|).*?(?=\|)/g
            //     //         const arr = newStr.match(regex)||[]
            //     //         console.log('====', arr);
            //     //         return {
            //     //             content: arr[0]||''
            //     //         }
            //     //         // const str = marked(data.toString());
            //     //         // console.log('str',str);
            //     //     }
            //     // })
            // })
            const dataList = this.getMarkdownsList();
            return {
                code: 0,
                data: dataList
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error

            }
        }

    }

    async updateBatch(body) {
        return await this.articlesService.updateByTitle(body)
    }

    async updateBatchAll() {
        // return await this.articlesService.updateByTitle(body)
        const dataList = this.getMarkdownsList();
        return await this.articlesService.updateAllByTitle(dataList)
    }
}
