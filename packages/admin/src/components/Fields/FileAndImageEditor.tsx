import React, { useEffect, useState } from 'react'
import { Upload, message, Progress } from 'antd'
import {
  isFileId,
  uploadFile,
  fileIdToUrl,
  getTempFileURL,
  getFileNameFromUrl,
  batchGetTempFileURL,
} from '@/utils'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

/**
 * 文件、图片编辑组件
 */
export const IFileAndImageEditor: React.FC<{
  field: SchemaField
  type: 'file' | 'image'
  value?: string | string[]
  resourceLinkType?: 'https' | 'fileId'
  onChange?: (v: string | string[] | null) => void
}> = (props) => {
  let { value: links, type, field, onChange = () => {}, resourceLinkType = 'fileId' } = props
  const { isMultiple } = field

  // 数组模式，多文件
  if (isMultiple || Array.isArray(links)) {
    return (
      <IMultipleEditor
        type={type}
        onChange={onChange}
        fileUris={links as string[]}
        resourceLinkType={resourceLinkType}
      />
    )
  }

  // 单文件
  const fileUri: string = links as string
  return (
    <ISingleFileUploader
      type={type}
      fileUri={fileUri}
      onChange={onChange}
      resourceLinkType={resourceLinkType}
    />
  )
}

/**
 * 单文件、图片上传
 */
export const ISingleFileUploader: React.FC<{
  type: 'file' | 'image'
  fileUri: string
  onChange: (v: string | string[] | null) => void
  resourceLinkType: 'fileId' | 'https'
}> = ({ type, fileUri, onChange, resourceLinkType }) => {
  const [percent, setPercent] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const tipText = type === 'file' ? 'File' : 'Image'

  // 加载图片预览
  useEffect(() => {
    if (!fileUri) {
      return
    }

    // 文件名
    const fileName = getFileNameFromUrl(fileUri)

    // 文件，不加载预览
    if (type === 'file') {
      setFileList([
        {
          url: fileUri,
          uid: fileUri,
          name: fileName || `${tipText} has been uploaded`,
          status: 'done',
        },
      ])
      return
    }

    // 非 fileId，无需加载预览
    if (!isFileId(fileUri)) {
      return setFileList([
        {
          url: fileUri,
          uid: fileUri,
          name: fileName || `${tipText} has been uploaded`,
          status: 'done',
        },
      ])
    }

    // 获取临时链接
    getTempFileURL(fileUri)
      .then((url: string) => {
        setFileList([
          {
            url,
            uid: fileUri,
            name: fileName || `${tipText} has been uploaded`,
            status: 'done',
          },
        ])
      })
      .catch((e) => {
        message.error(`Failed when getting URL of image ${e.message}`)
      })
  }, [])

  return (
    <>
      <Dragger
        fileList={fileList}
        listType={type === 'image' ? 'picture' : 'text'}
        onRemove={(file) => {
          onChange(null)
          setFileList([])
        }}
        beforeUpload={(file) => {
          setUploading(true)
          setPercent(0)
          // 上传文件
          uploadFile(file, (percent) => {
            setPercent(percent)
          }).then((fileId: string) => {
            // 保存链接
            onChange(resourceLinkType === 'fileId' ? fileId : fileIdToUrl(fileId))
            // 添加图片
            setFileList([
              {
                uid: fileId,
                name: file.name,
                status: 'done',
              },
            ])
            message.success(`${tipText} has been uploaded`)
          })
          return false
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag {tipText} to upload</p>
      </Dragger>
      {uploading && <Progress style={{ paddingTop: '10px' }} percent={percent} />}
    </>
  )
}

/**
 * 多文件、图片上传
 */
const IMultipleEditor: React.FC<{
  fileUris: string[]
  type: 'file' | 'image'
  resourceLinkType: 'fileId' | 'https'
  onChange: (v: string[]) => void
}> = (props) => {
  let { fileUris = [], type, onChange = () => {}, resourceLinkType = 'fileId' } = props
  const [percent, setPercent] = useState(0)
  const [fileList, setFileList] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const tipText = type === 'file' ? 'File' : 'Image'

  // 如果为 multiple 模式，但是 fileUris 为字符串，则转为数组
  if (!Array.isArray(fileUris) && typeof fileUris === 'string') {
    fileUris = [fileUris]
  }

  // 加载图片预览
  useEffect(() => {
    if (!fileUris?.length) {
      return
    }

    // 当全部 fileId 已经转换成临时访问链接时，不重新获取
    if (fileUris.length <= fileList.length) {
      const isGotAllUrls = fileUris.every((fileUri) =>
        fileList.find((file) => file.uid === fileUri && file.url !== file.uid)
      )
      if (isGotAllUrls) {
        return
      }
    }

    // 全部为 http 链接
    const isAllHttp = fileUris.every((link) => !isFileId(link))

    // 文件不加载预览
    // 全部为 http 链接，不用转换
    if (isAllHttp || type === 'file') {
      const fileList = fileUris.map((fileUri: string) => {
        const fileName = getFileNameFromUrl(fileUri)
        return {
          url: fileUri,
          uid: fileUri,
          name: fileName,
          status: 'done',
        }
      })
      setFileList(fileList)
      return
    }

    // 可能存在 fileId 和 http 混合的情况
    const fileIds = fileUris.filter((fileUri) => isFileId(fileUri))

    // 获取临时访问链接
    batchGetTempFileURL(fileIds)
      .then((results) => {
        // 拼接结果和 http 链接
        const fileList = fileUris.map((fileUri: string) => {
          const fileName = getFileNameFromUrl(fileUri)
          let fileUrl: string = fileUri
          if (isFileId(fileUri)) {
            // eslint-disable-next-line
            const ret = results.find((_) => _.fileID === fileUri)
            fileUrl = ret?.tempFileURL || ''
          }

          return {
            url: fileUrl,
            uid: fileUri,
            name: fileName || `${tipText} has been uploaded`,
            status: 'done',
          }
        })

        setFileList(fileList)
      })
      .catch((e) => {
        message.error(`Failed when getting URL of image ${e.message}`)
      })
  }, [fileUris])

  return (
    <>
      <Dragger
        fileList={fileList}
        listType={type === 'image' ? 'picture' : 'text'}
        onRemove={(file) => {
          const newFileList = fileList.filter((_) => _.uid !== file.uid)
          const urls = newFileList.map((file) => file.uid)
          onChange(urls)
          setFileList(newFileList)
        }}
        beforeUpload={(file) => {
          setUploading(true)
          setPercent(0)
          // 上传文件
          uploadFile(file, (percent) => {
            setPercent(percent)
          }).then((fileId: string) => {
            // 返回值
            const resourceLink = resourceLinkType === 'fileId' ? fileId : fileIdToUrl(fileId)
            onChange([...fileUris, resourceLink])
            // 添加图片
            setFileList([
              ...fileList,
              {
                uid: fileId,
                name: file.name,
                status: 'done',
              },
            ])
            message.success(`${tipText} has been uploaded`)
          })
          return false
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag {tipText} to upload</p>
      </Dragger>
      {uploading && <Progress style={{ paddingTop: '10px' }} percent={percent} />}
    </>
  )
}
