import React, { useState, useMemo } from 'react'
import { useParams, useRequest } from 'umi'
import { getContents } from '@/services/content'
import { Menu, Modal, Button, Dropdown, Alert, message } from 'antd'
import { exportData, formatSearchParams } from './common'

type ExportFileType = 'csv' | 'json'

/**
 * 导出数据
 */
const DataExport: React.FC<{ schema: Schema; collectionName: string; searchParams: any }> = ({
  schema,
  searchParams = {},
  collectionName,
}) => {
  const { projectId } = useParams<any>()
  const searchKeys = Object.keys(searchParams)
  const [visible, setVisible] = useState(false)
  const [fileType, setFileType] = useState<ExportFileType>('json')

  const fuzzyFilter = useMemo(() => formatSearchParams(searchParams, schema), [
    schema,
    searchParams,
  ])

  const { run: getExportData, loading } = useRequest(
    async () => {
      const { data } = await getContents(projectId, collectionName, {
        fuzzyFilter,
        page: 1,
        pageSize: 1000,
      })

      await exportData(data, fileType)
    },
    {
      manual: true,
      onSuccess: () => {
        setVisible(false)
        message.success('Data exported successfully')
      },
      onError: (e) => message.error(`Failed to export data：${e.message}`),
    }
  )

  return (
    <>
      <Dropdown
        overlay={
          <Menu
            onClick={({ key }) => {
              setVisible(true)
              setFileType(key as ExportFileType)
            }}
          >
            <Menu.Item key="csv">Export as CSV file</Menu.Item>
            <Menu.Item key="json">Export as JSON file</Menu.Item>
          </Menu>
        }
        key="search"
      >
        <Button type="primary">Export</Button>
      </Dropdown>
      <Modal
        centered
        destroyOnClose
        width={600}
        title="Export data"
        closable={true}
        visible={visible}
        okButtonProps={{ loading }}
        onOk={() => getExportData()}
        okText={loading ? 'Exporting' : 'Export'}
        onCancel={() => setVisible(false)}
      >
        {searchKeys?.length ? (
          <span>Export data in search result</span>
        ) : (
          <span>Export all data</span>
        )}
        <Alert type="warning" message="You can only export up to 1000 entries" className="mt-3" />
      </Modal>
    </>
  )
}

export default DataExport
