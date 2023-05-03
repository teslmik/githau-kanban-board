import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ColumnValue, Status } from '../enums/enums';
import { ItemStateType, ItemType } from '../types/types';
import { fetchIssues } from './actions';

type initialStateType = {
  items: ItemStateType[] | [];
  status: Status;
}

const initialState: initialStateType = {
  items: [],
  status: Status.IDLE
}

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    updateCards: (state, action: PayloadAction<{ updatedCards: ItemType[][], id: string | undefined}>) => {
      const currentRepo = current(state.items).filter(item => item.id === action.payload.id);
      const { repoItems, ...repoData } = currentRepo[0];
      const remainingRepo = current(state.items).filter(item => item.id !== action.payload.id);

      state.items = [
        ...remainingRepo,
        {
          ...repoData,
          repoItems: {
            todo: action.payload.updatedCards[0],
            inProgress: action.payload.updatedCards[1],
            done: action.payload.updatedCards[2],
          }
        }];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [...state.items];
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      const { repoName, projectName } = action.meta.arg;
      const { starsCount, ...repoItems } = action.payload;

      if (!state.items.some(item => item.id === `${repoName}/${projectName}`)) {
        const newRepoItem: { [key in ColumnValue]: ItemType[] } = { todo: [], inProgress: [], done: [] };

        for (const prop in repoItems) {
          if (repoItems.hasOwnProperty(prop)) {
            newRepoItem[prop as ColumnValue] = repoItems[prop as ColumnValue].map((item) => ({
              id: item.id,
              user: item.user.login,
              comments: item.comments,
              number: item.number,
              title: item.title,
              state: item.state,
              assignee: item.assignee?.login,
              createdAt: item.created_at,
            }));
          }
        }
        const newIssues = {
          id: `${repoName}/${projectName}`,
          repoItems: newRepoItem,
          starsCount: starsCount.stargazers_count,
        };

        state.items = [...state.items, newIssues];
      }
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchIssues.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [...state.items];
    });
  }
});

export const { updateCards } = issuesSlice.actions;

export default issuesSlice.reducer;