import { ItemType } from "../types/types";

type diffType = {
  index: number,
  before: ItemType[],
  after: ItemType[]
}

function arraysEqual(arr1: ItemType[][], arr2: ItemType[][]) {
  // Сравниваем длины массивов
  if (arr1.length !== arr2.length) {
    return { equal: false };
  }

  // Сравниваем отсортированные массивы
  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    // Находим различия
    const differences: diffType[] = [];
    arr1.forEach((innerArr1, index) => {
      const innerArr2 = arr2[index];
      if (JSON.stringify(innerArr1) !== JSON.stringify(innerArr2)) {
        differences.push({ index, before: innerArr1, after: innerArr2 });
      }
    });
    return { equal: false, differences };
  }

  // Массивы равны
  return { equal: true };
}

export { arraysEqual };
