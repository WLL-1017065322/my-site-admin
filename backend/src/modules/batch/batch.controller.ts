import { Controller, Get, Res } from '@nestjs/common';
import { readdirSync, readFile, } from 'fs';
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
        fileLists.forEach(item => {
            readFile(`${filePath}/${item}`, (err, data) => {
                if (err) {
                    console.log('文件不存在');
                }else{
                    console.log('data',data);
                    const str = marked(data.toString());
                    console.log('str',str);
                }
            })
        })
        console.log('fileLists', fileLists);
        return '11'
    }
}
