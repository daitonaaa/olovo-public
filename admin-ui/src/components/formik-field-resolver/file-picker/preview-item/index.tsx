import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ImageHolder, Wrapper, FileName, DeleteImage, Filetype } from './styled';
import { FileApi } from '../../../../http/models/api';
import { requireNotNull } from '../../../../utils';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

interface CommonProps {
  onDelete?(): void;
}

interface ServerItemProps extends CommonProps {
  file: FileApi;
  getWebp(file: FileApi): string;
  getOriginal(file: FileApi): string;
}

export const FileServerPickerView = ({ file, onDelete, getWebp, getOriginal }: ServerItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageWebpSource = useMemo(() => getWebp(file), [getWebp, file]);
  const imageOriginalSource = useMemo(() => getOriginal(file), [getOriginal, file]);
  return (
    <Wrapper>
      <Filetype>{file.extensions}</Filetype>
      {onDelete && <DeleteImage onClick={onDelete} />}

      {validImageTypes.includes(file.mimeType) ? (
        <ImageHolder onLoad={() => setIsLoaded(true)} isVisible={isLoaded}>
          <picture>
            <source type="image/webp" srcSet={imageWebpSource} />
            <img src={imageOriginalSource} alt="" />
          </picture>
        </ImageHolder>
      ) : (
        <ImageHolder isVisible={true}>
          <p>{file.name}</p>
        </ImageHolder>
      )}
      <FileName>{file.name}</FileName>
    </Wrapper>
  );
};

interface BrowserProps extends CommonProps {
  file: File;
}

const ext_name = (filename: string): string => {
  const reg = /(.\w+)$/g;
  const [ext] = reg[Symbol.match](filename) || [];
  return ext || 'unknown';
};

export const FileBrowserPickerItem = ({ file, onDelete }: BrowserProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const convertToImagePreview = (gettedFile: File) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      if (ref.current && reader.result) {
        ref.current.setAttribute('src', reader.result.toString());
        requireNotNull(wrapperRef.current).setAttribute('data-image-load', 'true');
      }
    };
    reader.readAsDataURL(gettedFile);
  };

  useEffect(() => convertToImagePreview(file), []);

  return (
    <Wrapper>
      <Filetype>{ext_name(file.name)}</Filetype>
      {onDelete && <DeleteImage onClick={onDelete} />}
      {validImageTypes.includes(file.type) ? (
        <ImageHolder ref={wrapperRef}>
          <img ref={ref} alt="image preview" />
        </ImageHolder>
      ) : (
        <ImageHolder isVisible={true}>
          <p>{file.name}</p>
        </ImageHolder>
      )}
      <FileName>{file.name}</FileName>
    </Wrapper>
  );
};
