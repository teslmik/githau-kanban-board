import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Col, Row, Typography } from "antd";
import { ColumnsDataType, ItemType } from "../types/types";
import { IssueCard } from "./issue-card";

type Properties = {
  column: ColumnsDataType;
  cardsArray: ItemType[] | undefined;
}

const ColumnItem: React.FC<Properties> = ({ column, cardsArray }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnStyle = {
    backgroundColor: '#F5F5F5',
    flex: '1 1 auto',
    alignItems: 'flex-start',
  }

  return (
    <div className="issues-column">
      <Row justify={"center"}>
        <Col>
          <Typography>
            <Typography.Title level={3}>{column.name}</Typography.Title>
          </Typography>
        </Col>
      </Row>
      <SortableContext
        id={column.id}
        items={cardsArray ?? []}
      >
        <Row
          align={"middle"}
          style={columnStyle}
        >
          <Col ref={setNodeRef}>
            {cardsArray?.map(elem => (
              <IssueCard key={elem.id} cardData={elem} />
            ))}
          </Col>
        </Row>
      </SortableContext>
    </div>
  )
}

export { ColumnItem };