import { ColumnValue } from '../enums/enums';
import { ItemType } from './types';

type ItemStateType = {
  id: string;
  starsCount: number;
  repoItems: {
    [key in ColumnValue]: ItemType[];
  };
};

export type { ItemStateType };
