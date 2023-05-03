import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Col, Divider, Layout, Row, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ColumnItem, MainBreadcrumbs, MainHeader, MainInput } from '../components/components';
import { columnsData } from '../constants/constants';
import { parseGithubUrl, updateIfArraysNotEqual } from '../helpers/helpers';
import { RootState, useAppDispatch } from '../redux/store';
import { ColumnsDataType, ItemType } from '../types/types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [lists, setLists] = useState<ColumnsDataType[]>(columnsData);
  const [value, setValue] = useState('');

  const { items, status } = useSelector((state: RootState) => state.issues);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { repoName, projectName } = parseGithubUrl(value);

  const currentIssues = items.find((item) => item.id === `${repoName}/${projectName}`);

  const findContainer = (id: UniqueIdentifier) => {
    if (lists.some((list) => list.cards && list.cards.some((card) => card.id === id))) {
      return lists.find((list) => list.cards.some((card) => card.id === id));
    }

    return lists.find((list) => list.id === id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over!;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setLists((prev): ColumnsDataType[] => {
      const activeCards = prev.find((list) => list.id === activeContainer.id)?.cards ?? [];
      const activeCard = activeCards?.find((card) => card.id === id)!;

      const updateActiveList = {
        ...activeContainer,
        cards: activeContainer.cards.filter((card) => card.id !== active.id),
      };

      const updateOverContainer = {
        ...overContainer,
        cards: [...overContainer.cards.filter((card) => card.id !== id), activeCard],
      };

      const updatedLists = prev.map((list) => {
        if (list.id === activeContainer.id) {
          return updateActiveList;
        } else if (list.id === overContainer.id) {
          return updateOverContainer;
        } else {
          return list;
        }
      });

      updateIfArraysNotEqual(currentIssues!, updatedLists, dispatch);

      return updatedLists;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over!;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeCards = lists.find((list) => list.id === activeContainer.id)?.cards ?? [];
    const activeCard = activeCards.find((card) => card.id === id)!;
    const overCards = lists.find((list) => list.id === overContainer.id)?.cards ?? [];
    const overCard = overCards.find((card) => card.id === overId)!;

    const activeIndex = activeCards.indexOf(activeCard);
    const overIndex = overCards.indexOf(overCard);

    if (activeIndex !== overIndex) {
      setLists((lists) => {
        const updatedContainer = {
          ...overContainer,
          cards: arrayMove<ItemType>(overContainer.cards, activeIndex, overIndex),
        };

        const updatedLists = lists.map((list) => {
          if (list.id === overContainer.id) {
            return updatedContainer;
          } else {
            return list;
          }
        });

        updateIfArraysNotEqual(currentIssues!, updatedLists, dispatch);

        return updatedLists;
      });
    }
  };

  useEffect(() => {
    if (currentIssues) {
      setLists((prevArray) => {
        return prevArray.map((list) => {
          const cards = currentIssues.repoItems[list.value] ?? [];
          return {
            ...list,
            cards: [...cards],
          };
        });
      });
    }
  }, [currentIssues]);

  return (
    <Layout className="layout">
      <MainHeader />
      <Layout.Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <MainInput setValue={setValue} />
          <Divider style={{ marginTop: 0 }} />
          {value && (
            <MainBreadcrumbs
              repoName={repoName}
              projectName={projectName}
              stars={currentIssues?.starsCount}
            />
          )}
          <DndContext
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            <Row gutter={24} style={{ flex: '1 1 auto' }}>
              {lists.map((column) => (
                <Col key={column.id} span={8}>
                    <ColumnItem column={column} cardsArray={column.cards} status={status} />
                </Col>
              ))}
            </Row>
          </DndContext>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export { Home };
