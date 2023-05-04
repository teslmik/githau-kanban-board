type GithubUrlObject = {
  repoName: string;
  projectName: string;
};

const parseGithubUrl = (url: string): GithubUrlObject => {
  const regex = /^https:\/\/github.com\/([\w-]+)\/([\w-]+)\.*/;
  const match = url.match(regex);

  if (!match) {
    return { repoName: '', projectName: '' };
  }

  const repoName = match[1];
  const projectName = match[2];

  return { repoName, projectName };
};

export { parseGithubUrl };
