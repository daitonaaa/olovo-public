import React from 'react';
import {
  Wrapper,
  DropWrapper,
  Label,
  FilesPreviewWrapper,
  CloudIcon,
  CloudIcon2,
  CloudWrapper,
  DropzoneWrapper,
  CloudsWrapper,
  Hint,
} from './styled';
import { useDropzone } from 'react-dropzone';
import { FileBrowserPickerItem, FileServerPickerView } from './preview-item';
import { FileApi } from '../../../http/models/api';
import { useSettings } from '../../../http/query-hooks';
import { pickImage } from './utils';
import { CloudUpload } from '@material-ui/icons';
import { AnimateWrapper } from '../../animate-wrapper';

export interface FilePickerBrowserFile {
  type: 'browser-file';
  entityFieldName: string;
  data: File;
}

export interface FilePickerServerFile {
  type: 'server-file';
  data: FileApi;
}

export type FilePickerMixedFile = FilePickerBrowserFile | FilePickerServerFile;

export type FilePickerValue = (FilePickerBrowserFile | FilePickerServerFile)[];

interface FilePickerProps {
  allowedTypes: string[] | undefined;
  isMultiple: boolean;
  label: string;
  name: string;
  value: FilePickerValue;
  isDisabled?: boolean;

  onChange(files: FilePickerValue): void;
}

export const FilePicker = ({ label, isMultiple, allowedTypes, value, onChange, name, isDisabled }: FilePickerProps) => {
  const { data: appSettings } = useSettings();
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const names = (value || []).map(f => f.data.name);
    const offDuplicates = acceptedFiles.filter(as => !names.includes(as.name));
    const filesBrowser: FilePickerBrowserFile[] = offDuplicates.map(file => ({
      type: 'browser-file',
      data: file,
      entityFieldName: name,
    }));

    if (!value) {
      onChange(filesBrowser);
    } else {
      onChange([...value, ...filesBrowser]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isDisabled,
    multiple: isMultiple,
    accept: allowedTypes
      ? allowedTypes.reduce((acc: any, cur: any) => {
          acc[cur] = [];
          return acc;
        }, {})
      : undefined,
  });

  const handleDelete = (name: string) => {
    if (value) {
      const newValue = value.filter(item => item.data.name !== name);
      onChange(newValue);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      {value && value?.length > 0 && (
        <FilesPreviewWrapper>
          {value.map((file, i) => {
            if (file.type === 'browser-file') {
              return (
                <AnimateWrapper delay={150} key={i}>
                  <FileBrowserPickerItem
                    key={file.data.name}
                    file={file.data}
                    onDelete={() => handleDelete(file.data.name)}
                  />
                </AnimateWrapper>
              );
            }

            if (file.type === 'server-file' && appSettings?.uploadStaticPath) {
              return (
                <AnimateWrapper delay={150} key={file.data.id}>
                  <FileServerPickerView
                    key={file.data.id}
                    onDelete={() => handleDelete(file.data.name)}
                    file={file.data}
                    getWebp={item => [appSettings.uploadStaticPath, pickImage(item.path, 'webp', 'm')].join('')}
                    getOriginal={item => [appSettings.uploadStaticPath, pickImage(item.path, 'original', 'm')].join('')}
                  />
                </AnimateWrapper>
              );
            }
          })}
        </FilesPreviewWrapper>
      )}
      {!isMultiple && value?.length > 0 ? null : (
        <DropzoneWrapper {...getRootProps()} isDisabled={isDisabled}>
          <DropWrapper {...getRootProps()} isDisabled={isDisabled}>
            <input {...getInputProps()} />
          </DropWrapper>
          <CloudWrapper>
            <CloudsWrapper>
              <CloudIcon>
                <CloudUpload color="inherit" fontSize="large" />
              </CloudIcon>
              <CloudIcon2>
                <CloudUpload color="primary" fontSize="large" />
              </CloudIcon2>
            </CloudsWrapper>
            <Hint>{isDragActive ? 'Отпустите файлы для загрузки' : 'Перетащите файлы в эту область или нажмите'}</Hint>
          </CloudWrapper>
        </DropzoneWrapper>
      )}
    </Wrapper>
  );
};
