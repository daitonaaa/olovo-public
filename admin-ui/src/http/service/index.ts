import axios from 'axios';
import { HttpBaseService } from './base-service';
import { emitAppEvent } from '../../events/use-app-event-broadcast';
import { AppEvents } from '../../events/types';
import Cookies from 'js-cookie';
import { routes } from '../../routes';

export const COOKIE_JWT_KEY = 'app_session';

export const isAuth = () => Cookies.get(COOKIE_JWT_KEY);

export const logout = () => {
  Cookies.remove(COOKIE_JWT_KEY);
  location.href = routes.login;
};

export class HttpService extends HttpBaseService {}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  customParams: {},
});

instance.interceptors.request.use(async config => {
  const { customParams } = config;
  if (customParams && customParams.isAuthRoute) {
    const jwt = Cookies.get(COOKIE_JWT_KEY);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }
  return config;
});

instance.interceptors.response.use(undefined, async err => {
  let message = '';
  if (err.isAxiosError) {
    message = `${err.response.data.statusCode} | ${err.response.data.message} | ${err.config.method.toUpperCase()}: ${
      err.config.url
    }`;
  } else {
    message = err.message;
  }

  if ([401, 403].includes(err?.response?.status)) {
    logout();
  }

  emitAppEvent(AppEvents.api_error, { message });

  throw err;
});

export const httpService: HttpService = new HttpService(instance);
