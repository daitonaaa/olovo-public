import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { TitleBlock, Wrapper, Text, BlockMap, BlockAdress, TextTitle, Content } from './styled';
import { Contact } from '../Footer/styled';

const placemarks = [
  {
    coordinates: [56.840596, 60.586946],
  },
];

const ComponentMap = () => {
  return (
    <Wrapper>
      <TitleBlock>
        <Text>Контакты</Text>
      </TitleBlock>

      <BlockAdress>
        <TextTitle>Центральный офис</TextTitle>
        <Content>
          <Contact>
            <img src="assets/icon/map.svg" />
            <span>Екатеринбург, Титова 29</span>
          </Contact>
          <Contact>
            <img src="assets/icon/footer_phone.svg" />
            <a href="tel:88002225285" className="contact__link">
              8 800 222 52 85
            </a>
          </Contact>

          <Contact>
            <img src="assets/icon/footer_message.svg" />
            <a href="malito:info@ural-olovo.ru" className="contact__link">
              info@ural-olovo.ru
            </a>
          </Contact>
        </Content>
      </BlockAdress>
      <BlockMap>
        <YMaps>
          <Map
            defaultState={{ center: [56.772769, 60.614102], zoom: 15 }}
            style={{ width: '100%', height: '595px' }}
            instanceRef={(ref) => {
              // @ts-ignore
              ref && ref.behaviors.disable('scrollZoom');
            }}
            options={{
              minZoom: 4,
            }}
          >
            <Placemark
              geometry={[56.772769, 60.614102]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: 'assets/icon/pane-icon.svg',
                iconImageSize: [57, 76],
              }}
            />
            <ZoomControl options={{ float: 'right' }} />
          </Map>
        </YMaps>
      </BlockMap>
    </Wrapper>
  );
};

export default ComponentMap;
