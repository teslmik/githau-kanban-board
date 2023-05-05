import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'antd';

import { diffDays } from '../helpers/helpers';
import { ItemType } from '../types/types';

enum PositionCard {
  RELATIVE = 'relative',
}

type Properties = {
  cardData: ItemType;
};

const IssueCard: React.FC<Properties> = ({ cardData }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: cardData.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: PositionCard.RELATIVE,
    zIndex: 1,
    maxWidth: 332,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-test-card-id={cardData.id}>
      <Card hoverable title={cardData.title} bordered={false} style={{ margin: '16px' }}>
        <p>{`#${cardData.number} opened ${diffDays(cardData.createdAt)} days ago`}</p>
        <p>{`${cardData.assignee || cardData.user} | Comments: ${cardData.comments}`}</p>
      </Card>
    </div>
  );
};

export { IssueCard };
