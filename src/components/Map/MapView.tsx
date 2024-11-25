import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { KakaoMapLoader } from '@utils/KakaoMapLoader.tsx';
import { useEffect, useState } from 'react';
import { getRegionName } from '@utils/getUtils.ts';
import { createRoute } from '@apis/route.ts';
import { useLocation } from 'react-router-dom';

export const MapView = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [routeData, setRouteData] = useState(null);

  // const [regionName, setRegionName] = useState<string>('');

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const location = useLocation();
  console.log(location);
  const { start, end } = location.state;

  useEffect(() => {
    const startPoint = { latitude: start.lat, longitude: start.lng };
    const endPoint = { latitude: end.lat, longitude: end.lng };

    createRoute(startPoint, endPoint)
      .then((data) => {
        setRouteData(data);
        // console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   if (isMapLoaded) {
  //     const lat = 37.506320759000715;
  //     const lng = 127.05368251210247;
  //
  //     getRegionName(lat, lng)
  //       .then((name) => {
  //         setRegionName(name);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [isMapLoaded]);
  // console.log(regionName);

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
