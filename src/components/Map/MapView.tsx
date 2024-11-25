import styled from 'styled-components';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { createRoute } from '@apis/route.ts';
import { useLocation } from 'react-router-dom';
import { useKakaoLoader } from '@hooks/useKakaoLoader.ts';

type RouteCoord = {
  lat: number;
  lng: number;
  title: string;
};

export const MapView = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // Map 객체 저장

  const [routeCoords, setRouteCoords] = useState<RouteCoord[]>([]);
  const [center, setCenter] = useState({
    lat: 37.22343906361677,
    lng: 127.18729793101929
  });
  const [openMarkerIndex, setOpenMarkerIndex] = useState<number | null>(null); // 열려 있는 마커의 index 저장

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
          { lat: start.lat, lng: start.lng, title: '출발' },
          ...data.intermediatePoints.map((point: any, index: number) => ({
            lat: point.restArea.coordinates.latitude,
            lng: point.restArea.coordinates.longitude,
            title: point.restArea.name
          })),
          { lat: end.lat, lng: end.lng, title: '도착' }
        ];
        setRouteCoords(coords);
        // console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(routeCoords);

  useEffect(() => {
    if (mapRef.current && routeCoords.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      routeCoords.forEach((coord) => {
        if (coord.lat && coord.lng) {
          bounds.extend(new window.kakao.maps.LatLng(coord.lat, coord.lng));
        }
      });
      mapRef.current.setBounds(bounds);
    }
  }, [routeCoords]);

  useEffect(() => {
    console.log(routeCoords);
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
          {routeCoords.map((coord, index) => (
            <MapMarker
              key={index}
              position={{ lat: coord.lat, lng: coord.lng }}
              clickable={true}
              title={coord.title}
              onClick={() =>
                setOpenMarkerIndex((prev) => (prev === index ? null : index))
              }
            >
              {openMarkerIndex === index && (
                <MarkerContainer>
                  <p>{coord.title}</p>
                  <img
                    alt="close"
                    width="14px"
                    height="13px"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    onClick={() => setOpenMarkerIndex(null)}
                  />
                </MarkerContainer>
              )}
            </MapMarker>
          ))}
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

const MarkerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  gap: 10px;
  background: lightpink;
`;
