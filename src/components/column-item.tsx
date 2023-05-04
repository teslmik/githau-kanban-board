import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Col, Empty, Row, Spin, Typography } from 'antd';

import { Status } from '../enums/enums';
import { ColumnsDataType, ItemType } from '../types/types';
import { IssueCard } from './issue-card';

type Properties = {
  column: ColumnsDataType;
  cardsArray: ItemType[];
  status: Status;
};

const ColumnItem: React.FC<Properties> = ({ column, cardsArray, status }) => {
  const isLoading = status === Status.LOADING ? true : false;
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnStyle = {
    backgroundColor: '#F5F5F5',
    flex: '1 1 auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };

  return (
    <div className="issues-column">
      <Row justify={'center'}>
        <Col>
          <Typography>
            <Typography.Title level={3}>{column.name}</Typography.Title>
          </Typography>
        </Col>
      </Row>
      <SortableContext
        id={column.id}
        strategy={verticalListSortingStrategy}
        items={cardsArray ?? []}>
        <Row align={'middle'} style={columnStyle}>
          {!isLoading && cardsArray.length > 0 ? (
            <Col ref={setNodeRef} style={{ flex: '1 1 auto' }} data-test-column-id={column.id}>
              {cardsArray?.map((elem) => (
                <IssueCard key={elem.id} cardData={elem} />
              ))}
            </Col>
          ) : isLoading ? (
            <Spin size={'large'} style={{ paddingTop: 32 }} />
          ) : (
            <Empty style={{ marginTop: 32 }} />
          )}
        </Row>
      </SortableContext>
    </div>
  );
};

export { ColumnItem };
