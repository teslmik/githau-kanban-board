import type store from '../redux/store';
import { arraysEqual } from './helpers';
import { updateCards } from '../redux/slice';
import { ColumnsDataType, ItemStateType } from '../types/types';

const updateIfArraysNotEqual = (
  currentIssues: ItemStateType,
  updatedLists: ColumnsDataType[],
  dispatch: typeof store.dispatch,
) => {
  const currentIssuesCards = Object.values(currentIssues?.repoItems ?? {});
  const updatedCards = updatedLists.map((list) => list.cards);
  const isArraysEqual = arraysEqual(currentIssuesCards, updatedCards);

  if (!isArraysEqual) {
    dispatch(updateCards({ updatedCards, id: currentIssues?.id }));
  }
};

export { updateIfArraysNotEqual };
