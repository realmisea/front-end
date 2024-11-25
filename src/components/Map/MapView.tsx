import styled from 'styled-components';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { getRegionName } from '@utils/getUtils.ts';
import { createRoute } from '@apis/route.ts';
import { useLocation } from 'react-router-dom';
import { useKakaoLoader } from '@hooks/useKakaoLoader.ts';

export const MapView = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // Map 객체 저장

  const [routeCoords, setRouteCoords] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [center, setCenter] = useState({
    lat: 37.22343906361677,
    lng: 127.18729793101929
  });

  const isLoaded = useKakaoLoader();

  useEffect(() => {
    if (isLoaded) {
      console.log('카카오맵 로드');
    }
  }, [isLoaded]);

  const location = useLocation();
  console.log(location);
  const { start, end } = location.state;

  useEffect(() => {
    const startPoint = { latitude: start.lat, longitude: start.lng };
    const endPoint = { latitude: end.lat, longitude: end.lng };

    createRoute(startPoint, endPoint)
      .then((data) => {
        const coords = [
          { lat: start.lat, lng: start.lng }, // 출발지
          ...data.intermediatePoints.map((point: any) => ({
            lat: point.latitude,
            lng: point.longitude
          })), // 중간 경유지
          { lat: end.lat, lng: end.lng } // 도착지
        ];
        setRouteCoords(coords);
        // console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(routeCoords);

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

  useEffect(() => {
    if (mapRef.current && routeCoords.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      routeCoords.forEach((coord) =>
        bounds.extend(new window.kakao.maps.LatLng(coord.lat, coord.lng))
      );
      mapRef.current.setBounds(bounds); // 경로를 한눈에 보이도록 중심과 줌 설정
    }
  }, [routeCoords]);

  return (
    <MapContainer>
      {isLoaded ? (
        <Map
          center={center}
          style={{ width: '100%', height: '100%' }}
          level={3}
          draggable={true}
          onCreate={(map) => {
            mapRef.current = map;
          }}
        >
          {/* 경로 표시 */}
          {routeCoords.length > 1 && (
            <Polyline
              path={routeCoords}
              strokeWeight={10}
              strokeColor="#FF0000"
              strokeOpacity={0.8}
              strokeStyle="solid"
            />
          )}

          {/* 마커 */}
          {routeCoords.map((coord, index) => {
            let title = '';
            if (index === 0) title = '출발';
            else if (index === routeCoords.length - 1) title = '도착';
            else title = String.fromCharCode(65 + index - 1); // 'A', 'B'...

            return (
              <MapMarker
                key={index}
                position={coord}
                clickable={true}
                title={title}
              />
            );
          })}
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
