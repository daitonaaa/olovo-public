import { httpService } from './service';
import { AppInfo, ComponentViewModel, PageViewModel, User, Settings, CrudConfig } from './models/view-models';
import {
  ComponentRequest,
  DeleteRequestApi,
  PageRequestApi,
  SettingsRequest,
  UpdatableComponentRequest,
  Menu,
  FileSubject,
  MenuResponseApiModel,
} from './models/api';
import { HttpOptions } from './service/options';

export const getPages = async () => {
  return httpService.get<PageViewModel[]>('/page');
};

export const getPageById = async (id: string) => {
  return httpService.get<PageViewModel>(`/page/${id}`);
};

export const getComponents = async () => {
  return httpService.get<ComponentViewModel[]>('/component');
};

export const getComponentById = async (id: string) => {
  return httpService.get<ComponentViewModel>(`/component/${id}`);
};

export const createComponent = async (model: ComponentRequest) => {
  return httpService.post('/component', model);
};

export const createOrUpdateComponent = async (model: UpdatableComponentRequest) =>
  httpService.post(`/component`, model);

export const createOrUpdatePage = async (model: PageRequestApi) => {
  return httpService.post('/page', model);
};

export const deletePageNode = async (id: number) => {
  const model = new DeleteRequestApi();
  model.id = id;
  return httpService.delete('/page/node', model);
};

export const deletePage = async (id: number) => {
  return httpService.delete('/page', { id });
};

export const getAppInfo = () => httpService.get<AppInfo>('/info');

export const getCurrentUser = () => httpService.get<User>('/users/current');

export const login = (email: string, password: string) =>
  httpService.post<string>('/users/auth/login', { email, password }, new HttpOptions().asNoAuthRoute());

export const getSettings = async () => {
  return httpService.get<Settings & { cruds: CrudConfig[]; uploadStaticPath: string }>('/settings');
};

export const createOrUpdateSettings = async (settings: SettingsRequest) => httpService.post('/settings', settings);

export const getMenu = async () => httpService.get<Menu>('/menu');

export const createMenuSettings = async (data: any) => httpService.post<Menu>('/settings/menu', data);
export const getMenuSettings = async () => httpService.get<MenuResponseApiModel>('/settings/menu');

export const getCrudItemBySlug = (crudName: string, slug: any) => httpService.get(`/${crudName}/${slug}`);

export const getCrudList = (crudName: string) => httpService.get(`/${crudName}`);

export const patchCrudBySlug = (crudName: string, slug: any, newData: any) =>
  httpService.patch(`/${crudName}/${slug}`, newData);

export const createCrudApi = (crudName: string, data: any) => httpService.post<{ id: number }>(`/${crudName}`, data);

export const deleteCrudItem = (crudName: string, slug: string) => httpService.delete(`/${crudName}/${slug}`);

export interface ApiUploadParams {
  file: File;
  subject?: FileSubject;
}

export const fileApiUpload = ({ file, subject }: ApiUploadParams) => {
  const options = new HttpOptions().setHeader('Content-Type', 'multipart/form-data').timeout(30000);
  const fd = new FormData();
  fd.append('file', file);

  if (subject) {
    for (const key in subject) {
      if (typeof (subject as any)[key] !== undefined) {
        fd.append(key, (subject as any)[key]);
      }
    }
  }

  return httpService.post('/files/upload', fd, options);
};

export const fileApiDelete = (id: number) => httpService.delete(`/files/upload/${id}`);
