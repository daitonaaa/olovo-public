import axios from 'axios';
import { getAppConfig } from '../shared/pipes/config';
import { HttpService } from '../http/service';
import { PageConfig, TextRecord, Upload } from './types';
import { HttpOptions } from '../http/service/options';
import { Settings } from './api-models/settings';
import { MenuResponseApiModel } from '@/core/admin/api-models/menu';

const axiosInstance = axios.create({
  baseURL: getAppConfig().API_ADMIN_URL,
});

export const httpAdminService: HttpService = new HttpService(axiosInstance);

export const getPageConfigByUrl = (candidate: string) => {
  return httpAdminService.post<PageConfig>(`/page/get_by_link`, { url: candidate });
};

export const getTextRecord = (key: string) =>
  httpAdminService.get<TextRecord>(`/textRecord/${encodeURIComponent(key)}`);

export const createText = (text: string) =>
  httpAdminService.post('/func/email', { text }, new HttpOptions().withCredentials(false));

export const getSettings = () =>
  httpAdminService.get<Settings>('/settings', new HttpOptions().withCredentials(false));

export const getCrudList = (name: string) =>
  httpAdminService.get<any[]>(`${name}`, new HttpOptions().withCredentials(false));

export const getCrudSingleBySlug = (name: string, slug: string) =>
  httpAdminService.get<any[]>(`${name}/${slug}`, new HttpOptions().withCredentials(false));

export const getCityByQuery = (query: string) =>
  httpAdminService.get<any[]>(
    `/settings/city-list?q=${query}`,
    new HttpOptions().withCredentials(false)
  );

export const getCityByIP = () =>
  httpAdminService.get<any>(`/settings/detect-city`, new HttpOptions().withCredentials(false));

export const uploadFiles = (files) => {
  const options = new HttpOptions()
    .setHeader('Content-Type', 'multipart/form-data')
    .timeout(30_000)
    .withCredentials(false);

  const fd = new FormData();

  files.forEach((file) => {
    fd.append('files', file);
  });

  return httpAdminService.post<Upload[]>('/upload', fd, options);
};

export const getMenu = async () => httpAdminService.get<MenuResponseApiModel>('/settings/menu');
