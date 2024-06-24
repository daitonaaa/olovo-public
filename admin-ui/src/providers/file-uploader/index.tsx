import React, { createContext, useState } from 'react';
import { IndicatorContent, IndicatorWrapper, Text } from './styled';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { nanoid } from 'nanoid';
import { WaveLoader } from '../../components/loader';
import { ApiUploadParams, fileApiUpload } from '../../http/endpoints';
import { Nullable } from '../../types';

type Handler<R> = (params: { file: File; extra: any; path: string }) => R;

interface FileParams {
  file: File;
  extra?: any;
}

interface FileUploadResponse {
  file: File;
  extra?: any;
  path: string;
}

interface RunUploadParams extends FileParams {
  getApiParams(): Omit<ApiUploadParams, 'file'>;
}

interface ContextProps {
  upload(params: RunUploadParams): Promise<FileUploadResponse>;
}

const Context = createContext<ContextProps | null>(null);

const UploadIndicator = ({ loaded, total }: any) => {
  return (
    <IndicatorWrapper>
      <AnimateWrapper delay={200}>
        <IndicatorContent>
          <WaveLoader />
          <Text>
            <h3>Загрузка файлов...</h3>
            <span className="hint">Не закрывайте приложение до завершения загрузки что бы файлы не потерялись</span>
            <span className="hint">
              Загружено <b>{loaded}</b> из {total}
            </span>
          </Text>
        </IndicatorContent>
      </AnimateWrapper>
    </IndicatorWrapper>
  );
};

interface UploadConfig extends RunUploadParams {
  finish: Handler<void>;
  isUploaded?: boolean;
  isError?: boolean;
  __id: string;
}

let curUploadId: Nullable<string> = null;

export const FileUploaderProvider: React.FC = ({ children }) => {
  const [uploadQueue, setUploadQueue] = useState<UploadConfig[]>([]);

  const getNextForUpload = (): Nullable<UploadConfig> => {
    let nextForUpload: Nullable<UploadConfig> = null;
    setUploadQueue(cur => {
      cur.forEach(item => {
        if (!item.isUploaded && !item.isError) {
          nextForUpload = item;
        }
      });

      return cur;
    });

    return nextForUpload;
  };

  const setIsLoadedStatus = (id: string, flag: boolean) =>
    setUploadQueue(cur =>
      cur.map(item => {
        if (item.__id === id) {
          item.isUploaded = flag;
        }

        return item;
      })
    );

  const setIsErrorStatus = (id: string, flag: boolean) =>
    setUploadQueue(cur =>
      cur.map(item => {
        if (item.__id === id) {
          item.isError = flag;
        }

        return item;
      })
    );

  const nextTick = () => {
    if (curUploadId === null) {
      const next = getNextForUpload();
      if (next) {
        startUpload(next);
      } else {
        setUploadQueue([]);
      }
    }
  };

  const startUpload = (item: UploadConfig) => {
    if (curUploadId === null) {
      curUploadId = item.__id;
      fileApiUpload({ file: item.file, subject: item.getApiParams().subject })
        .then(async (data: any) => {
          await item.finish({
            file: item.file,
            extra: item.extra,
            path: data.path,
          });
        })
        .catch(() => {
          setIsErrorStatus(item.__id, true);
        })
        .finally(async () => {
          curUploadId = null;
          setIsLoadedStatus(item.__id, true);
          nextTick();
        });
    }
  };

  const handleUpload = async (params: RunUploadParams) => {
    return new Promise<FileUploadResponse>(resolve => {
      const id = nanoid(5);
      setUploadQueue(arr => [
        ...arr,
        {
          __id: id,
          isUploaded: false,
          isError: false,
          file: params.file,
          getApiParams: params.getApiParams,
          finish: data => {
            resolve({ file: params.file, extra: params.extra, path: data.path });
          },
        },
      ]);

      if (curUploadId === null) {
        setTimeout(() => nextTick(), 500);
      }
    });
  };

  const list = uploadQueue.filter(item => !item.isError);
  const total = list.length;
  const currentLoaded = list.filter(upload => upload.isUploaded).length;

  return (
    <Context.Provider value={{ upload: handleUpload }}>
      {list.length > 0 && <UploadIndicator loaded={currentLoaded} total={total} />}
      {children}
    </Context.Provider>
  );
};

export const useFileUploader = () => React.useContext(Context) as ContextProps;
