import { Body, Controller, Get, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { readdirSync, readFile, readFileSync, writeFile } from 'fs';
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
        return this.batchService.queryList()
    }




    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file) {
    //     console.log('file', file);
    // }
    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files) {
        const filePath = resolve(process.cwd(), 'public/blog')
        writeFile(`${filePath}/${files[0].originalname}`, files[0].buffer, (err) => {
            if (err) {
                console.log('err', err);
                return {
                    code: 1,
                    errMsg: err
                }
            } else {
                console.log('写入成功');
                return {
                    code: 0,
                }
            }
        })
    }



    @Get('/myinfo')
    getMyInfo(@Query() query) {
        // console.log('__dirname', __dirname);
        // console.log('process.cwd()', process.cwd());
        // const filePath = resolve(process.cwd(), 'public/markdown')
        if (!query.fileName) return {
            code: 1,
            errMsg: '无该文件'
        }
        let fileName = query.fileName
        try {
            const filePath = resolve(process.cwd(), `public/myinfo/${fileName}`)
            // const fileLists = readdirSync(filePath);
            const fileContent = readFileSync(filePath)
            console.log('fileContent', fileContent);
            return {
                code: 0,
                data: fileContent.toString()
            }
        } catch (error) {
            console.log(error);
            return {
                code: 1,
                errMsg: error

            }
        }

    }

    @Post('myinfo')
    @UseInterceptors(AnyFilesInterceptor())
    uploadMyInfo(@UploadedFiles() files) {
        const filePath = resolve(process.cwd(), 'public/myinfo')
        writeFile(`${filePath}/${files[0].originalname}`, files[0].buffer, (err) => {
            if (err) {
                console.log('err', err);
                return {
                    code: 1,
                    errMsg: err
                }
            } else {
                console.log('写入成功');
                return {
                    code: 0,
                }
            }
        })
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
    updateBatch(@Body() body) {
        return this.batchService.updateBatch(body)
        // return this.batchService.
    }
    @Put('/all')
    putBatchAll(@Body() body) {
        return this.batchService.updateBatchAll()
        // return this.batchService.
    }
}
