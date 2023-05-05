import { ItemType } from './types';
import { ColumnValue } from '../enums/enums';

type ColumnsDataType = {
  id: string;
  name: string;
  value: ColumnValue;
  cards: ItemType[];
};

export type { ColumnsDataType };
