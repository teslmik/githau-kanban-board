import { ItemType } from './types';
import { ColumnValue } from '../enums/enums';

type ItemStateType = {
  id: string;
  starsCount: number;
  repoItems: {
    [key in ColumnValue]: ItemType[];
  };
};

export type { ItemStateType };
