import { useQuery } from 'react-query';
import { getAppInfo, getCurrentUser, getMenuSettings, getPages, getSettings } from './endpoints';

export const useAppInfo = () => useQuery('app-info', () => getAppInfo());

export const useUser = () => useQuery('get-user', () => getCurrentUser());

export const useSettings = () => useQuery(['get_settings'], getSettings);

export const useMenu = () => useQuery(['get_menu_settings'], getMenuSettings);

export const usePages = () => useQuery(['get_pages'], getPages);
