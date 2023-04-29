import { Card } from 'antd';
import React from 'react'

const IssueCard: React.FC = () => {
  return (
    <Card hoverable title="Some issue title" bordered={false} style={{ margin: '16px' }}>
      <p>#315 opened 3 days ago</p>
      <p>Admin | Comments: 3</p>
    </Card>
  )
}

export { IssueCard };