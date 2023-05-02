import { ItemType } from "./types";

type itemStateType = {
  id: string;
  starsCount: number;
  repoItems: {
    [key: string]: ItemType[];
  }
};

export type { itemStateType };
