import { getCityByQuery } from '@/core/admin/http';
import useDebounce from '@/core/shared/hooks/use-debounce';
import { isClient } from '@/core/shared/pipes/config';
import { safeJsonParse, safeJsonStringify } from '@/core/shared/utils/helpers';
import { City } from '@/core/types/city';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { getCityByIP } from '@/core/admin/http';

interface UserCity {
  name: string;
  id: number;
}

interface UseCurrentCityHookResult {
  appliedCity: UserCity | null;
  cities: City[];
  currentCity: string;
  searchCity: string;
  setSearchCity: (value: string) => void;
  isPopupVisible: boolean;
  setIsPopupVisible: (value: boolean) => void;
  isChangeVisible: boolean;
  setIsChangeVisible: (value: boolean) => void;
  saveCity: ({ name, id }: { name: string; id: number }) => void;
  saveInitialCity: () => void;
  handleChangeCity: () => void;
}

const Context = React.createContext<UseCurrentCityHookResult | undefined>(undefined);

export const CityProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState('');
  const [searchCity, setSearchCity] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);
  const storageCity = isClient ? safeJsonParse(localStorage.getItem('olovo_city')) : null;
  const [detectedCity, setDetectedCity] = useState(null);

  const handleChangeCity = () => {
    setIsPopupVisible(false);
    setIsChangeVisible(true);
  };

  const handleSearchCity = async (query: string) => {
    const result = await getCityByQuery(query);
    if (query.length === 0) {
      setCities(result?.slice(0, 16));
    } else {
      setCities(result);
    }
  };

  const debouncedSearch = useDebounce((query: string) => handleSearchCity(query), 500);

  const saveCity = ({ name, id }: { name: string; id: number }) => {
    localStorage.setItem('olovo_city', safeJsonStringify({ name, id }));
    setIsChangeVisible(false);
    setSearchCity('');
    setCurrentCity(name);
  };

  const saveInitialCity = () => {
    if (!storageCity && detectedCity) {
      localStorage.setItem('olovo_city', safeJsonStringify(detectedCity));
    }

    if (!storageCity && !detectedCity) {
      localStorage.setItem('olovo_city', safeJsonStringify({ name: 'Екатеринбург', id: 4 }));
    }

    setIsPopupVisible(false);
  };

  useEffect(() => {
    debouncedSearch(searchCity);
  }, [searchCity]);

  useEffect(() => {
    (async () => {
      if (isClient) {
        let dCity = null;
        if (!storageCity) {
          dCity = await getCityByIP();
          setDetectedCity(dCity);
          setIsPopupVisible(true);
        }

        setCurrentCity(storageCity?.name || dCity?.name || 'Екатеринбург');
      }
    })();
  }, []);

  const value = useMemo((): UseCurrentCityHookResult => {
    return {
      currentCity: currentCity,
      handleChangeCity: handleChangeCity,
      saveCity: saveCity,
      saveInitialCity: saveInitialCity,
      isPopupVisible: isPopupVisible,
      setIsPopupVisible: setIsPopupVisible,
      searchCity: searchCity,
      setSearchCity: setSearchCity,
      isChangeVisible: isChangeVisible,
      setIsChangeVisible: setIsChangeVisible,
      cities: cities,
      appliedCity: isClient ? safeJsonParse(localStorage.getItem('olovo_city')) : null,
    };
  }, [cities, currentCity, isChangeVisible, isPopupVisible, searchCity]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCurrentCity = () => React.useContext(Context);
