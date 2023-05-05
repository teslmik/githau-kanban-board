import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiUrl } from '../enums/enums';
import { axiosInstance } from '../helpers/helpers';
import { Issue } from '../types/issue.type';
import { RootState } from './store';

type returnType = {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
  starsCount: {
    stargazers_count: number;
  };
};

const fetchIssues = createAsyncThunk<returnType, Record<string, string>, { state: RootState }>(
  'issues/fetchIssuesStatus',
  async ({ repoName, projectName }, { rejectWithValue }) => {
    try {
      const [todo, inProgress, done, starsCount] = await Promise.all([
        axiosInstance.get(
          `${repoName}/${projectName}/issues?state=open&assignee=none&${ApiUrl.PAGE_QUERY}`,
        ),
        axiosInstance.get(
          `${repoName}/${projectName}/issues?state=open&assignee=*&${ApiUrl.PAGE_QUERY}`,
        ),
        axiosInstance.get(`${repoName}/${projectName}/issues?state=closed&${ApiUrl.PAGE_QUERY}`),
        axiosInstance.get(`${repoName}/${projectName}`),
      ]);

      return {
        todo: todo.data,
        inProgress: inProgress.data,
        done: done.data,
        starsCount: starsCount.data,
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('Failed to contact the server. Check your Internet connection.');
      } else {
        return rejectWithValue('An error occurred while loading data. Please try again later.');
      }
    }
  },
);

export { fetchIssues };
