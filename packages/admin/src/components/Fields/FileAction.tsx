import { copyToClipboard, downloadFile, getTempFileURL, isFileId } from '@/utils'
import { CopyTwoTone } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useState } from 'react'

/**
 * 文件/图片通用下载、复制访问链接组件
 * fileUri 可能是 fileId 或 https
 */
export const FileAction: React.FC<{
  index?: number
  fileUri: string
  type: 'file' | 'image'
}> = (props) => {
  const { index, fileUri, type } = props
  const tipText = type === 'file' ? 'File' : 'Image'

  let [copyLoading, setCopyLoading] = useState<number | boolean>(false)
  let [downloadLoading, setDownloadLoading] = useState<number | boolean>(false)

  copyLoading = typeof index === 'undefined' ? copyLoading : copyLoading === index
  downloadLoading = typeof index === 'undefined' ? downloadLoading : downloadLoading === index

  return (
    <div className="flex justify-center">
      {/* https 链接暂时不支持下载 */}
      {isFileId(fileUri) && (
        <Button
          type="link"
          size="small"
          loading={downloadLoading as boolean}
          onClick={() => {
            if (typeof index === 'undefined') {
              setDownloadLoading(true)
            } else {
              setDownloadLoading(index)
            }

            downloadFile(fileUri)
              .then(() => {
                message.success(`Download ${tipText} successfully`)
              })
              .catch((e) => {
                console.log(e)
                console.log(e.message)
                message.error(`Download ${tipText} failed ${e.message}`)
              })
              .finally(() => {
                setDownloadLoading(false)
              })
          }}
        >
          Download {tipText}
        </Button>
      )}
      <Button
        type="link"
        size="small"
        loading={copyLoading as boolean}
        onClick={() => {
          if (typeof index === 'undefined') {
            setCopyLoading(true)
          } else {
            setCopyLoading(index)
          }

          if (!isFileId(fileUri)) {
            copyToClipboard(fileUri)
            setCopyLoading(false)
            return
          }

          getTempFileURL(fileUri)
            .then((url) => {
              copyToClipboard(url)
            })
            .catch((e) => {
              console.log(e)
              console.log(e.message)
              message.error(`Failed when getting URL ${e.message}`)
            })
            .finally(() => {
              setCopyLoading(false)
            })
        }}
      >
        Visit URL
        <CopyTwoTone />
      </Button>
    </div>
  )
}
