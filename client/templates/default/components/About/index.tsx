import React from 'react';
import {
  TitleBlock,
  Wrapper,
  Text,
  BlockText,
  Content,
  ContentImage,
  ContentInfo,
  InfoBlock,
  BlockImage,
} from './styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper';

const data = [
  { title: '>10', id: 1, desc: 'лет работы' },
  { title: '2400', id: 2, desc: 'тонн готовой продукции в год' },
  { title: '>15', id: 3, desc: 'типов продукции' },
];

export const About: React.FC = () => {
  return (
    <>
      <Wrapper>
        <TitleBlock>
          <Text>О компании</Text>
        </TitleBlock>

        <Content>
          <ContentInfo>
            {data.map((it) => (
              <InfoBlock key={it.id}>
                <h1>{it.title}</h1>
                <span className="info-block__desc">{it.desc}</span>
              </InfoBlock>
            ))}
          </ContentInfo>
          <ContentImage>
            <img src="assets/images/about.png" />
          </ContentImage>
        </Content>
        <BlockText>
          <span>
            ООО “Урал-Олово” начинает свою историю с 2012 года. За это время был основан
            опытно-мтеаллургический цех по производству металлов и сплавов на основе олова и свинца,
            после установки прессового оборудования был освоен выпуск проволоки и прутка. Долгое
            время это было основным направлением деятельности предприятия, пока не было принято
            решение о расширении производственных мощностей. Новым этапом в работе предприятия стало
            изготовление цинковых и цинк-алюминиевых сплавов горячего цинкования, наладке линий
            проката анодов для гальваники, а также рафинация и переработка свница. Сегодня ООО
            “Урал-Олово” является одним из крупнейших в России производителей припоя, баббита и
            изделий из олова.
          </span>
          <span>
            Производственная площадка организации имеет собственную сертифицированную лабораторию
            для эмиссионного спектрального анализа металлов и сплавов, что позволяет контролировать
            химический состав сплава на каждом этапе его производства и своевременно вносить
            коррективы в технологический процесс. Для экспресс анализа и сортировки металлов и
            сплавов на производстве применяется рентгенфлуоресцентный XRF спектрометр Olympus Vanta.
            Производственная мощность электропечей позволяет выпускать объем порядка 2400 тонн
            готовой продукции в год и объединяет в себе универсальность в переработке разного рода
            сырья, легкость и безопасность эксплуатации.
          </span>
        </BlockText>
      </Wrapper>

      <BlockImage>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img src="assets/images/about_bottom.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/about_bottom_2.png" />
          </SwiperSlide>
        </Swiper>
      </BlockImage>
    </>
  );
};
