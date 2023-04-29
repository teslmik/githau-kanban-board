import { Col, Divider, Layout, Row, theme } from "antd";
import { ColumnItem } from "../components/column-item";
import { MainBreadcrumbs } from "../components/main-breadcrumbs";
import { MainHeader } from "../components/main-header";
import { MainInput } from "../components/main-input";

const { Content, Footer } = Layout;

const columnsName = ['ToDo', 'In Progress', 'Done'];

const Home: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <MainHeader />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <MainInput />
          <Divider />
          <MainBreadcrumbs />
          <Row gutter={24} style={{ flex: '1 1 auto' }}>
            {columnsName.map((column) => (
              <Col span={8}>
                <ColumnItem title={column} />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer />
    </Layout>
  )
}

export { Home };
