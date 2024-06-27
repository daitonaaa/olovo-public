import React from 'react';
import { TitleBlock, Wrapper, Text, Content, BlockPartners } from './styled';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Cursor } from '@/currentTemplate/theme/components';

export const Partners: React.FC = () => {
  return (
    <Wrapper>
      <TitleBlock>
        <Text>Партнеры</Text>
      </TitleBlock>

      <Content>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img src="assets/images/partners_image_1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/partners_image_2.png" />
          </SwiperSlide>
        </Swiper>
        <BlockPartners>
          <Cursor>
            <a>
              <img src="assets/icon/gazprom.svg" />
            </a>
          </Cursor>
          <Cursor>
            <a>
              <img src="assets/icon/polyus.svg" />
            </a>
          </Cursor>
          <Cursor>
            <a>
              <img src="assets/icon/lukoil.svg" />
            </a>
          </Cursor>
          <Cursor>
            <a>
              <img src="assets/icon/RZD.svg" />
            </a>
          </Cursor>
        </BlockPartners>
      </Content>
    </Wrapper>
  );
};
