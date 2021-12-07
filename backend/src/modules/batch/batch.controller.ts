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
        console.log('__dirname', __dirname);
        console.log('process.cwd()', process.cwd());
        const filePath = resolve(process.cwd(), 'public/markdown')
        console.log(filePath);
        const fileLists = readdirSync(filePath);
        const dataList = fileLists.map(item => {
            const itemContent = readFileSync(`${filePath}/${item}`)
            console.log('itemContent', itemContent);
            const newStr = itemContent.toString();
            const regex = /(?<=\|).*?(?=\|)/g
            const msg = newStr.match(regex)
            return {
                content: newStr,
                msg: msg
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
