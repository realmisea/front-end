import styled from 'styled-components';
import Cloud from '@assets/images/main-cloud.svg';
import SearchIcon from '@assets/images/search.svg';
import { KakaoMapLoader } from '@utils/KakaoMapLoader.tsx';
import { useState } from 'react';
import { searchPlace } from '@utils/KakaoMapService.ts';

export const MainPage = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const [startResults, setStartResults] = useState([]);
  const [endResults, setEndResults] = useState([]);
  const [selectedStartCoords, setSelectedStartCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedEndCoords, setSelectedEndCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  // 출발지 검색
  const handleStartSearch = async () => {
    if (!isMapLoaded || !startPlace) return;
    try {
      const results = await searchPlace(startPlace);
      console.log('출발지 검색 결과: ', results);
      setStartResults(results); // 수정: startResults에 저장하도록 변경
    } catch (error) {
      console.error(error);
    }
  };

  // 도착지 검색
  const handleEndSearch = async () => {
    if (!isMapLoaded || !endPlace) return;
    try {
      const results = await searchPlace(endPlace);
      console.log('도착지 검색 결과: ', results);
      setEndResults(results); // 수정: endResults에 저장하도록 변경
    } catch (error) {
      console.error(error);
    }
  };

  // 출발지 선택
  const handleStartSelect = (place) => {
    setStartPlace(place.place_name);
    setSelectedStartCoords({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setStartResults([]);
  };

  const handleEndSelect = (place) => {
    setEndPlace(place.place_name);
    setSelectedEndCoords({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setEndResults([]);
  };

  return (
    <MainContainer>
      <KakaoMapLoader onLoad={handleMapLoad} />
      <Title>Wayther</Title>
      <InputContainer>
        <InputWrapper>
          <LabelText>출발지: </LabelText>
          <Input
            value={startPlace}
            onChange={(e) => setStartPlace(e.target.value)}
          />
          <SearchButton onClick={handleStartSearch}>
            <img src={SearchIcon} alt="검색" />
          </SearchButton>
        </InputWrapper>
        <InputWrapper>
          {startResults && (
            <ResultsContainer>
              {startResults.map((place) => (
                <ResultItem
                  key={place.id}
                  onClick={() => handleStartSelect(place)}
                >
                  {place.place_name}
                </ResultItem>
              ))}
            </ResultsContainer>
          )}
          <LabelText>도착지: </LabelText>
          <Input
            value={endPlace}
            onChange={(e) => setEndPlace(e.target.value)}
          />
          <SearchButton onClick={handleEndSearch}>
            <img src={SearchIcon} alt="검색" />
          </SearchButton>
        </InputWrapper>
        {endResults && (
          <ResultsContainer>
            {endResults.map((place) => (
              <ResultItem key={place.id} onClick={() => handleEndSelect(place)}>
                {place.place_name}
              </ResultItem>
            ))}
          </ResultsContainer>
        )}
      </InputContainer>
      <CloudImg src={Cloud} alt="구름" />
    </MainContainer>
  );
};

const ResultsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  max-height: 200px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const MainContainer = styled.div`
  width: 1280px;
  height: 832px;
  background: ${({ theme }) => theme.colors.yellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 96px;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Noto Serif', serif;
  letter-spacing: -5px;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
  gap: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 640px;
  height: 88px;
  border: 3px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50px;
  //background: white;
  background: cornflowerblue;
`;

const LabelText = styled.span`
  font-size: 24px;
  padding: 0 15px 0 68px;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 19px 0 30px;
`;

const CloudImg = styled.img`
  margin-bottom: -190px; // 여기 마진이 왜생기지?
`;
