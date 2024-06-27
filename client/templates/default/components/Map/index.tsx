import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { TitleBlock, Wrapper, Text, BlockMap } from './styled';

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
      <BlockMap>
        <YMaps>
          <Map
            defaultState={{ center: [56.75, 60.57], zoom: 6 }}
            style={{ width: '100%', height: '595px' }}
          >
            <Placemark
              geometry={[56.772769, 60.614102]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: 'assets/icon/pane-icon.svg',
                iconImageSize: [42, 42],
              }}
            />
          </Map>
        </YMaps>
      </BlockMap>
    </Wrapper>
  );
};

export default ComponentMap;
