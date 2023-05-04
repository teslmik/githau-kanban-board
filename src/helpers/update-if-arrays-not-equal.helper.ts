import { updateCards } from '../redux/slice';
import type store from '../redux/store';
import { ColumnsDataType, ItemStateType } from '../types/types';
import { arraysEqual } from './helpers';

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
