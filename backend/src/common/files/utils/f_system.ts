import { image_resize_config, webp_config } from '../config';

export const getImagesPostProcessNames = (candidate_name: string): string[] => {
  return [
    candidate_name,
    webp_config.get_name(candidate_name),
    ...image_resize_config.flatMap((c) => {
      const resized_name = c.get_name(candidate_name);
      return [resized_name, webp_config.get_name(resized_name)];
    }),
  ];
};
