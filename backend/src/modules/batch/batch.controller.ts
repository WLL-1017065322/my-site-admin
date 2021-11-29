import { Controller, Get, Res } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
    constructor(private readonly batchService: BatchService) {

    }
    @Get()
    getList() {
        console.log('__dirname', __dirname);
        const filePath = resolve(__dirname, '../../markdown')
        console.log(filePath);
        const fileLists = readdirSync(filePath)
        console.log('fileLists', fileLists);
        return '11'
    }
}
