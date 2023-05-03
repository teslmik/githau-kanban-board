import { ItemType } from "../types/types";

function arraysEqual(arr1: ItemType[][], arr2: ItemType[][]) {
  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}

export { arraysEqual };
