import { PlaceInput } from '@components/Map/PlaceInput.tsx';
import Blue from '@assets/images/map/blue-circle.svg';
import Arrow from '@assets/images/map/connection-arrow.svg';
import Red from '@assets/images/map/red-circle.svg';
import styled from 'styled-components';

export const MapPage = () => {
  return (
    <MapContainer>
      <MarkContainer>
        <img src={Blue} />
        <img src={Arrow} />
        <img src={Red} />
      </MarkContainer>
      <PlaceContainer>
        <PlaceInput title={'출발지: '} />
        <PlaceInput title={'도착지: '} />
      </PlaceContainer>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  gap: 9px;
`;

const MarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  background: forestgreen;
`;
