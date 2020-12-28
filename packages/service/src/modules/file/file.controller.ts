import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFiles,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { PermissionGuard } from '@/guards'
import { IFile } from './types'
import { FileService } from './file.service'

@UseGuards(PermissionGuard('content'))
@Controller('upload')
export class FileController {
  constructor(private fileService: FileService) {}

  // 上传文件
  // 返回 HTTP Code 要为 200，POST 默认的 201 前端不识别
  @Post()
  @HttpCode(200)
  @UseInterceptors(AnyFilesInterceptor())
  async createFile(@UploadedFiles() _files: IFile[]) {
    let files = _files

    // 上传文件
    const jobs = files.map((file) => {
      return this.fileService.upload(file)
    })
    const data = await Promise.all(jobs)

    // 返回链接
    const result = await this.fileService.getUrl(data)
    return result
  }
}
