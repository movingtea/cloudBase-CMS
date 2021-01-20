import React from 'react'
import { Card } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { getCmsConfig } from '@/utils'

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>Welcome to {getCmsConfig('cmsTitle')}</Card>
    </PageContainer>
  )
}
