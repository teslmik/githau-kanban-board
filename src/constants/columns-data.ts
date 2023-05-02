import { ColumnValue } from "../enums/enums";
import { ColumnsDataType } from "../types/types";

const columnsData: ColumnsDataType[] = [
  {
    id: 'col-1',
    name: 'ToDo',
    value: ColumnValue.TODO,
    cards: [],
  },
  {
    id: 'col-2',
    name: 'In Progress',
    value: ColumnValue.IN_PROGRESS,
    cards: [],
  },
  {
    id: 'col-3',
    name: 'Done',
    value: ColumnValue.DONE,
    cards: [],
  }
]

export { columnsData };
