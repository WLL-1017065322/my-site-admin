import { Controller, Get, Put, Query, Res } from '@nestjs/common';
import { readdirSync, readFile, readFileSync, } from 'fs';
import { join, resolve } from 'path';
import { BatchService } from './batch.service';
const { marked } = require('marked')

@Controller('batch')
export class BatchController {
    constructor(private readonly batchService: BatchService) {
    }
    @Get()
    getList() {
        // console.log('__dirname', __dirname);
        // console.log('process.cwd()', process.cwd());
        // const filePath = resolve(process.cwd(), 'public/markdown')
        const filePath = resolve(process.cwd(), 'public/blog')
        // console.log(filePath);
        const fileLists = readdirSync(filePath);
        const dataList = fileLists.map(item => {
            console.log('item', item);
            const splitList = item.split('.')
            // console.log('splitList', splitList);
            let newStr, msg, title
            if (splitList[splitList.length - 1] === 'md') {
                title = item.replace('.md', '')
                const itemContent = readFileSync(`${filePath}/${item}`)
                // console.log('itemContent', itemContent);
                newStr = itemContent.toString();
                // const regex = /(?<=\|).*?(?=\|)/g
                // const regex =  /(?<=([^_^]:)).*?(?=([^_^]))/g
                const regex = /(?<=\[\^_\^\]:).*?(?=\[\^_\^\])/g
                const arr = newStr.match(regex)
                console.log('msg', arr);
                if (arr && arr.length > 0) {
                    msg = JSON.parse(arr[0])
                }
            }
            return {
                content: newStr,
                msg: msg,
                title
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
        return {
            data: dataList
        }
    }

    @Put()
    updateBatch(@Query() query) {
        console.log('updateBath', query);
        // return this.batchService.
    }
}
