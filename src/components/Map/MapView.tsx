import styled from 'styled-components';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { createRoute } from '@apis/route.ts';
import { useLocation } from 'react-router-dom';
import { useKakaoLoader } from '@hooks/useKakaoLoader.ts';
import { LoadingMessage } from '@components/Map/PointWeather.tsx';

export interface RouteCoord {
  lat: number;
  lng: number;
  title: string;
}

interface MapViewProps {
  onMarkerClick: (point: { title: string; lat: number; lng: number }) => void;
}
export const MapView = ({ onMarkerClick }: MapViewProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null); // Map 객체 저장

  const [routeCoords, setRouteCoords] = useState<RouteCoord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);

  const isMapLoaded = useKakaoLoader();

  useEffect(() => {
    if (isMapLoaded) {
      console.log('카카오맵 로드');
    }
  }, [isMapLoaded]);

  const location = useLocation();
  const { start, end } = location.state;

  const handleMapCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;
    setIsMapReady(true);
    console.log('지도 생성시 mapRef 업데이트 !!!!!!');
  };

  useEffect(() => {
    const fetchRouteData = async () => {
      setIsLoading(true);
      try {
        const startPoint = { latitude: start.lat, longitude: start.lng };
        const endPoint = { latitude: end.lat, longitude: end.lng };

        const data = await createRoute(startPoint, endPoint);
        console.log('루트 응답:', data);

        if (!data.intermediatePoints || data.intermediatePoints.length === 0) {
          console.warn('데이터가없단다.....');
        }

        const coords = [
          {
            lat: start.lat,
            lng: start.lng,
            title: `${start.placeName} (출발지)`
          },
          ...data.intermediatePoints.map((point: any) => ({
            lat: point.restArea.coordinates.latitude,
            lng: point.restArea.coordinates.longitude,
            title: point.restArea.name
          })),
          { lat: end.lat, lng: end.lng, title: `${end.placeName} (도착지)` }
        ];
        setRouteCoords(coords);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRouteData();
  }, [start, end]);

  useEffect(() => {
    console.log('isMapLoaded:', isMapLoaded);
    console.log('내가제일필요한 mapRef.current:', mapRef.current);
    console.log('routeCoords:', routeCoords);
    console.log('isMapReady', isMapReady);

    if (isMapLoaded && isMapReady && routeCoords.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      console.log('bounds1: ', bounds);

      // 모든 좌표를 bounds에 추가
      routeCoords.forEach((coord) => {
        bounds.extend(new kakao.maps.LatLng(coord.lat, coord.lng));
      });

      // 지도 영역을 경로 전체가 보이도록 설정
      mapRef.current?.setBounds(bounds);
      console.log('경로 다 보이니?', bounds);
    } else {
      console.error('실패다');
    }
  }, [isMapLoaded, isMapReady, routeCoords]);

  return (
    <MapContainer>
      {isMapLoaded ? (
        isLoading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : (
          <Map
            center={{ lat: start.lat, lng: start.lng }}
            style={{ width: '100%', height: '100%' }}
            draggable={true}
            onCreate={handleMapCreate}
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
              <CustomOverlayMap
                key={index}
                position={{ lat: coord.lat, lng: coord.lng }}
                clickable={true}
                yAnchor={1} // 말풍선 위치
              >
                <CustomMarkerContainer onClick={() => onMarkerClick(coord)}>
                  <p>{coord.title}</p>
                </CustomMarkerContainer>
              </CustomOverlayMap>
            ))}
          </Map>
        )
      ) : (
        <p>Loading KaKao Map...</p>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 55vw;
  height: 60vh;
  background: darkslateblue;

  @media (max-width: 768px) {
    width: 95%;
    height: 300px;
  }
`;

const CustomMarkerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  font-size: 14px;
  font-weight: bold;
  color: black;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 4px;
  }
`;
