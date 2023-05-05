import axios from 'axios';
import { ApiUrl } from '../enums/enums';

const axiosInstance = axios.create({
  baseURL: ApiUrl.GIT_API,
});

export { axiosInstance };
