import { Typography, Row, Layout, Col } from 'antd';

const MainHeader: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Layout.Header style={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
          <div className="header-container">
            <Typography>
              <Typography.Title level={2} style={{ color: '#fff', margin: '16px 0' }}>
                GitHub Kanban Board
              </Typography.Title>
            </Typography>
          </div>
        </Layout.Header>
      </Col>
    </Row>
  )
}

export { MainHeader };