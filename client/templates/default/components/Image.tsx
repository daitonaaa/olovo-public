import { usePageSettings } from '@/core/providers/page-settings';
import { pickImage, PickImageSize } from '@/core/shared/utils/helpers';
import React from 'react';

interface ImageProps {
  path?: string;
  size?: PickImageSize;
}

export const Image: React.FC<ImageProps> = ({ path, size = 'm' }) => {
  const { appSettings } = usePageSettings();

  if (path) {
    return (
      <picture>
        <source
          srcSet={pickImage(appSettings.uploadStaticPath + path, 'webp', size)}
          type="image/webp"
        />
        <img
          src={pickImage(appSettings.uploadStaticPath + path, 'original', size)}
          alt={'project page image'}
        />
      </picture>
    );
  }

  return <img src="/static/images/blue_image.jpg" />;
};
