import { Col, Row, Typography } from "antd";
import { IssueCard } from "./issue-card";

const { Title } = Typography;

type Properties = {
  title: string;
}

const ColumnItem: React.FC<Properties> = ({ title }) => {
  return (
    <div className="issues-column">
      <Row justify={"center"}>
        <Col>
          <Typography>
            <Title level={3}>{title}</Title>
          </Typography>
        </Col>
      </Row>
      <Row align={"middle"} style={{ backgroundColor: '#F5F5F5', flex: '1 1 auto', alignItems: 'flex-start' }}>
        <Col style={{ flex: '1 1 auto' }}>
          <IssueCard />
        </Col>
      </Row>
    </div>
  )
}

export { ColumnItem };