import styled from 'styled-components';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { createRoute } from '@apis/route.ts';
import { useLocation } from 'react-router-dom';
import { useKakaoLoader } from '@hooks/useKakaoLoader.ts';

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
  const { start, end } = location.state;

  useEffect(() => {
    const startPoint = { latitude: start.lat, longitude: start.lng };
    const endPoint = { latitude: end.lat, longitude: end.lng };

    createRoute(startPoint, endPoint)
      .then((data) => {
        const coords = [
          {
            lat: start.lat,
            lng: start.lng,
            title: `${start.placeName} (출발지)`
          },
          ...data.intermediatePoints.map((point: any, index: number) => ({
            lat: point.restArea.coordinates.latitude,
            lng: point.restArea.coordinates.longitude,
            title: point.restArea.name
          })),
          { lat: end.lat, lng: end.lng, title: `${end.placeName} (도착지)` }
        ];
        setRouteCoords(coords);
      })
      .catch((error) => console.error(error));
  }, []);

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
`;
