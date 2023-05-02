import { createSlice } from '@reduxjs/toolkit';
import { ColumnValue, Status } from '../enums/enums';
import { getFromLS } from '../helpers/get-from-ls.helper';
import { itemStateType, ItemType } from '../types/types';
import { fetchIssues } from './actions';

type initialStateType = {
  items: itemStateType[] | [];
  status: Status;
}

const initialState: initialStateType = {
  items: getFromLS(),
  status: Status.LOADING
}

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    updateCards(state, action) {
      const remainingRepo = state.items.filter(item => item.id !== action.payload.id);
      console.log('remainingRepo: ', remainingRepo);
      state.items = [...remainingRepo, action.payload.updatedCards];
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
        const newRepoItem: { [key: string]: ItemType[] } = {};

        for (const prop in repoItems) {
          if (repoItems.hasOwnProperty(prop)) {
            newRepoItem[prop] = repoItems[prop as ColumnValue].map((item) => ({
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