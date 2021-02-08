import React from 'react'

export const FieldTypes = [
  // 字符串：单行
  {
    type: 'String',
    name: 'String',
    icon: <i className="gg-format-color" />,
  },
  // 字符串：多行
  {
    type: 'MultiLineString',
    name: 'Multi line string',
    icon: <i className="gg-format-justify" />,
  },
  // 数字：整形、浮点型
  {
    type: 'Number',
    name: 'Number',
    icon: <i className="gg-math-percent" />,
  },
  // 布尔值
  {
    type: 'Boolean',
    name: 'Boolean',
    icon: <i className="gg-check" />,
  },
  {
    type: 'Enum',
    name: 'Enum',
    icon: <i className="gg-template" />,
  },
  // 时间
  {
    type: 'Date',
    name: 'Date',
    icon: <i className="gg-calendar-dates" />,
    description: 'Date, such as 2020-09-01',
  },
  {
    type: 'DateTime',
    name: 'Date and time',
    icon: <i className="gg-calendar-dates" />,
    description: 'Date and time, such as 2020-09-01 10:11:07',
  },
  // **颜色：Color**
  // 文件：File
  {
    type: 'File',
    name: 'File',
    icon: <i className="gg-file" />,
  },
  // 图片：Image
  {
    type: 'Image',
    name: 'Image',
    icon: <i className="gg-image" />,
  },
  {
    type: 'Media',
    name: 'Media',
    icon: <i className="gg-play-button-r" />,
  },
  // 邮箱地址
  {
    type: 'Email',
    name: 'Email',
    icon: <i className="gg-mail" />,
  },
  // 电话号码
  {
    type: 'Tel',
    name: 'Phone number',
    icon: <i className="gg-phone" />,
  },
  // 网址
  {
    type: 'Url',
    name: 'URL',
    icon: <i className="gg-link" />,
  },
  // 富文本
  {
    type: 'RichText',
    name: 'Rich Text',
    icon: <i className="gg-file-document" />,
  },
  // Markdown
  {
    type: 'Markdown',
    name: 'Markdown',
    icon: <i className="gg-chevron-double-down-o" />,
  },
  {
    type: 'Connect',
    name: 'Connection',
    icon: <i className="gg-arrow-top-right-r" />,
  },
  {
    type: 'Array',
    name: 'Array',
    icon: <i className="gg-list" />,
  },
  {
    type: 'Object',
    name: 'JSON object',
    icon: <i className="gg-list-tree" />,
    description: '可以自由存储类 JSON 对象和数组（非 JSON 字符串）',
  },
  // 数组：`Array<Value>`
  // 内容关联（外键）：分组与搜索，多层弹窗？
]

export const SYSTEM_FIELDS: any[] = [
  {
    displayName: 'Created at',
    id: '_createTime',
    name: '_createTime',
    type: 'DateTime',
    isSystem: true,
    dateFormatType: 'timestamp-ms',
    description: '系统字段，请勿随意修改',
  },
  {
    displayName: 'Edited at',
    id: '_updateTime',
    name: '_updateTime',
    type: 'DateTime',
    isSystem: true,
    dateFormatType: 'timestamp-ms',
    description: '系统字段，请勿随意修改',
  },
]
