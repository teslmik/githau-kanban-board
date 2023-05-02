import { itemStateType } from "../types/types";

const getFromLS = () => {
  const data = localStorage.getItem('items');
  const items: itemStateType[] | [] = data ? JSON.parse(data) : [];

  return items;
};

export { getFromLS };
