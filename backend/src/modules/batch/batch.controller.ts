import { Body, Controller, Get, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
        try {
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
    @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file) {
    //     console.log('file', file);
    // }
    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files) {
      console.log('files',files);
    }

    // @Post('upload')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'avatar', maxCount: 1 },
    //     { name: 'background', maxCount: 1 },
    // ]))
    // uploadFile(@UploadedFiles() files) {
    //     console.log(files);
    // }

    @Put()
    updateBatch(@Query() query) {
        console.log('updateBath', query);
        // return this.batchService.
    }
}
