import { Typography, Row, Layout, Col } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const MainHeader: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Header style={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
          <div className="header-container">
            <Typography>
              <Title level={2} style={{ color: '#fff', margin: '16px 0' }}>GitHub Kanban Board</Title>
            </Typography>
          </div>
        </Header>
      </Col>
    </Row>
  )
}

export { MainHeader };