import { PlaceInput } from '@components/Map/PlaceInput.tsx';
import Blue from '@assets/images/map/blue-circle.svg';
import Arrow from '@assets/images/map/connection-arrow.svg';
import Red from '@assets/images/map/red-circle.svg';
import styled from 'styled-components';
import { PointWeather } from '@components/Map/PointWeather.tsx';
import { MapView } from '@components/Map/MapView.tsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const MapPage = () => {
  const location = useLocation();
  const { start, end } = location.state;

  const [selectedPoint, setSelectedPoint] = useState({
    title: `${end.placeName} (도착지)`,
    lat: end.lat,
    lng: end.lng
  });

  return (
    <MapContainer>
      <InfoContainer>
        <InputContainer>
          <MarkContainer>
            <img src={Blue} />
            <img src={Arrow} />
            <img src={Red} />
          </MarkContainer>
          <PlaceContainer>
            <PlaceInput title={`출발지: ${start.placeName}`} />
            <PlaceInput title={`도착지: ${end.placeName}`} />
          </PlaceContainer>
        </InputContainer>
        <PointWeather
          title={selectedPoint.title}
          lat={selectedPoint.lat}
          lng={selectedPoint.lng}
        />
      </InfoContainer>
      <MapView onMarkerClick={(point) => setSelectedPoint(point)} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 37px;

  @media (max-width: 768px) {
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 9px;
  margin-left: 13px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;
