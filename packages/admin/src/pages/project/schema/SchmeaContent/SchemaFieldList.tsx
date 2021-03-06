import { useConcent } from 'concent'
import React, { useCallback } from 'react'
import { Button, Empty, Space } from 'antd'
import { SchmeaCtx } from 'typings/store'
import { SchemaFieldRender } from './FieldItemRender'

export interface TableListItem {
  key: number
  name: string
  status: string
  updatedAt: number
  createdAt: number
  progress: number
  money: number
}

const SchemaFields: React.FC = () => {
  const ctx = useConcent<{}, SchmeaCtx>('schema')
  const {
    state: { currentSchema },
  } = ctx

  // 编辑字段
  const editFiled = useCallback((field: SchemaField) => {
    ctx.setState({
      fieldAction: 'edit',
      selectedField: field,
      editFieldVisible: true,
    })
  }, [])

  return currentSchema?.fields?.length ? (
    <SchemaFieldRender
      schema={currentSchema}
      onFiledClick={(field) => editFiled(field)}
      actionRender={(field) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={(e) => {
              e.stopPropagation()
              editFiled(field)
            }}
          >
            编辑
          </Button>
          <Button
            danger
            size="small"
            type="primary"
            onClick={(e) => {
              e.stopPropagation()
              ctx.setState({
                fieldAction: 'delete',
                selectedField: field,
                deleteFieldVisible: true,
              })
            }}
          >
            删除
          </Button>
        </Space>
      )}
    />
  ) : (
    <div className="schema-empty">
      <Empty description="点击右侧字段类型，添加一个字段" />
    </div>
  )
}

export default SchemaFields
