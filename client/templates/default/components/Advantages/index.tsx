import { TitleBlock, Wrapper, Text, Content, Block, Desc, Title } from './styled';

const data = [
  {
    title: 'Бесплатная доставка',
    id: 1,
    desc: 'Доставим вашу продукцию до терминала транспортной компанией Байкал сервис, бесплатно и в кратчайшие сроки',
    img: 'assets/images/advant_1.png',
  },
  {
    title: 'Предоставление отсрочки',
    id: 2,
    desc: 'На некоторые виды продукции предоставляется отсрочка платежа на индивидуальных условиях.',
    img: 'assets/images/advant_2.png',
  },
  {
    title: 'Наличие готовой продукции',
    id: 3,
    desc: 'Постоянное наличие ассортимента готовой продукции на складе производителя. Минимальные сроки исполнения заказов.',
    img: 'assets/images/advant_3.png',
  },
  {
    title: 'Сертификат соответствия',
    id: 4,
    desc: 'Продукция проходит обязательный анализ химического состава металлов и сплавов в сертифицированной лаборатории.',
    img: 'assets/images/advant_4.png',
  },
];

export const Advantages: React.FC = () => {
  return (
    <Wrapper>
      <TitleBlock>
        <Text>Наши преимущества</Text>
      </TitleBlock>

      <Content>
        {data.map((it) => (
          <Block backgroundImageUrl={it.img}>
            <Title>{it.title}</Title>
            <Desc>{it.desc}</Desc>
          </Block>
        ))}
      </Content>
    </Wrapper>
  );
};
