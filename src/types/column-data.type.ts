import { ColumnValue } from "../enums/enums";
import { ItemType } from "./types";

type ColumnsDataType = {
  id: string;
  name: string;
  value: ColumnValue;
  cards: ItemType[],
}

export type { ColumnsDataType };
