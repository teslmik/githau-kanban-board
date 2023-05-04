import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl } from '../enums/enums';
import { Issue } from '../types/issue.type';
import { RootState } from './store';

const fetchIssues = createAsyncThunk<
  { todo: Issue[]; inProgress: Issue[]; done: Issue[]; starsCount: { stargazers_count: number } },
  Record<string, string>,
  { state: RootState }
>('issues/fetchIssuesStatus', async ({ repoName, projectName }) => {
  const headerToken = {
    headers: {
      'authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };

  const { data: todo } = await axios.get(
    `${ApiUrl.GIT_API}${repoName}/${projectName}/issues?state=open&assignee=none&${ApiUrl.PAGE_QUERY}`,
    headerToken && headerToken,
  );
  const { data: inProgress } = await axios.get(
    `${ApiUrl.GIT_API}${repoName}/${projectName}/issues?state=open&assignee=*&${ApiUrl.PAGE_QUERY}`,
    headerToken && headerToken,
  );
  const { data: done } = await axios.get(
    `${ApiUrl.GIT_API}${repoName}/${projectName}/issues?state=closed&${ApiUrl.PAGE_QUERY}`,
    headerToken && headerToken,
  );
  const { data: starsCount } = await axios.get(
    `${ApiUrl.GIT_API}${repoName}/${projectName}`,
    headerToken && headerToken,
  );
  return {
    todo,
    inProgress,
    done,
    starsCount,
  };
});

export { fetchIssues };
