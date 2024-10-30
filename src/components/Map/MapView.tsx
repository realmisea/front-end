import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { KakaoMapLoader } from '@components/Map/KaKaoMapLoader.tsx';
import { useState } from 'react';

export const MapView = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <MapContainer>
      <KakaoMapLoader onLoad={handleMapLoad} />
      {isMapLoaded ? (
        <Map
          center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {/* 마커 */}
          <MapMarker
            position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
          ></MapMarker>
        </Map>
      ) : (
        <p>loading...</p>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 700px;
  height: 500px;
`;
