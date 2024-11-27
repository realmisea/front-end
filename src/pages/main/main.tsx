import styled from 'styled-components';
import Cloud from '@assets/images/main-cloud.svg';
import SearchIcon from '@assets/images/search.svg';
import { KakaoMapLoader } from '@utils/KakaoMapLoader.tsx';
import { useEffect, useState } from 'react';
import { Place, searchPlace } from '@utils/KakaoMapService.ts';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const [startResults, setStartResults] = useState<Place[]>([]);
  const [endResults, setEndResults] = useState<Place[]>([]);
  const [selectedStartCoords, setSelectedStartCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedEndCoords, setSelectedEndCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [startHistory, setStartHistory] = useState<string[]>([]);
  const [endHistory, setEndHistory] = useState<string[]>([]);

  const navigate = useNavigate();

  // 검색 기록 업데이트 함수 (출발지)
  const updateStartHistory = (query: string) => {
    setStartHistory((prev) => {
      const updatedHistory = Array.from(new Set([query, ...prev])); // 중복 제거
      localStorage.setItem('startHistory', JSON.stringify(updatedHistory)); // localStorage에 저장
      return updatedHistory;
    });
  };

  // 검색 기록 업데이트 함수 (도착지)
  const updateEndHistory = (query: string) => {
    setEndHistory((prev) => {
      const updatedHistory = Array.from(new Set([query, ...prev])); // 중복 제거
      localStorage.setItem('endHistory', JSON.stringify(updatedHistory)); // localStorage에 저장
      return updatedHistory;
    });
  };

  // 컴포넌트가 마운트될 때 기존 기록 불러오기
  useEffect(() => {
    const storedStartHistory = localStorage.getItem('startHistory');
    if (storedStartHistory) {
      setStartHistory(JSON.parse(storedStartHistory));
    }

    const storedEndHistory = localStorage.getItem('endHistory');
    if (storedEndHistory) {
      setEndHistory(JSON.parse(storedEndHistory));
    }
  }, []);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  // 출발지 검색
  const handleStartSearch = async () => {
    if (!isMapLoaded || !startInput.trim()) return;
    updateStartHistory(startInput);
    try {
      const results = await searchPlace(startInput);
      console.log('출발지 검색 결과: ', results);
      setStartResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  // 도착지 검색
  const handleEndSearch = async () => {
    if (!isMapLoaded || !endInput.trim()) return;
    updateEndHistory(endInput);
    try {
      const results = await searchPlace(endInput);
      console.log('도착지 검색 결과: ', results);
      setEndResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  // 출발지 선택
  const handleStartSelect = (place: Place) => {
    setStartPlace(place.place_name);
    setStartInput(place.place_name);
    setSelectedStartCoords({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setStartResults([]);
  };

  const handleEndSelect = (place: Place) => {
    setEndPlace(place.place_name);
    setEndInput(place.place_name);
    setSelectedEndCoords({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setEndResults([]);
    console.log(endPlace);
  };

  const handleKeyDown = (e: KeyboardEvent, isStart: boolean) => {
    if (e.key === 'Enter') {
      isStart ? handleStartSearch() : handleEndSearch();
    }
  };

  // 출발지 검색 기록
  const handleStartHistoryClick = (query: string) => {
    setStartInput(query); // 선택한 기록을 인풋창에 반영
    handleStartSearch(); // 해당 기록으로 검색 실행
  };

  // 도착지 검색 기록
  const handleEndHistoryClick = (query: string) => {
    setEndInput(query); // 선택한 기록을 인풋창에 반영
    handleEndSearch(); // 해당 기록으로 검색 실행
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setStartResults([]);
      setEndResults([]);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedStartCoords && selectedEndCoords) {
      navigate(`/map`, {
        state: {
          start: { ...selectedStartCoords, placeName: startPlace },
          end: { ...selectedEndCoords, placeName: endPlace }
        }
      });
    }
  }, [selectedStartCoords, selectedEndCoords, navigate, startPlace, endPlace]);

  return (
    <MainContainer>
      <KakaoMapLoader onLoad={handleMapLoad} />
      <Title>Wayther</Title>
      <InputContainer>
        <InputWrapper>
          <LabelText>출발지: </LabelText>
          <Input
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, true)}
          />
          <SearchButton onClick={handleStartSearch}>
            <img src={SearchIcon} alt="검색" />
          </SearchButton>
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
          {startHistory.length > 0 && (
            <HistoryContainer>
              {startHistory.map((query, index) => (
                <HistoryItem
                  key={index}
                  onClick={() => handleStartHistoryClick(query)}
                >
                  {query}
                </HistoryItem>
              ))}
            </HistoryContainer>
          )}
        </InputWrapper>

        <InputWrapper>
          <LabelText>도착지: </LabelText>
          <Input
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, false)}
          />
          <SearchButton onClick={handleEndSearch}>
            <img src={SearchIcon} alt="검색" />
          </SearchButton>
          {endResults && (
            <ResultsContainer>
              {endResults.map((place) => (
                <ResultItem
                  key={place.id}
                  onClick={() => handleEndSelect(place)}
                >
                  {place.place_name}
                </ResultItem>
              ))}
            </ResultsContainer>
          )}
          {endHistory.length > 0 && (
            <HistoryContainer>
              {endHistory.map((query, index) => (
                <HistoryItem
                  key={index}
                  onClick={() => handleEndHistoryClick(query)}
                >
                  {query}
                </HistoryItem>
              ))}
            </HistoryContainer>
          )}
        </InputWrapper>
      </InputContainer>
      <CloudImg src={Cloud} alt="구름" />
    </MainContainer>
  );
};

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
  position: relative;
  display: flex;
  align-items: center;
  width: 640px;
  height: 88px;
  border: 3px solid ${({ theme }) => theme.colors.gray};
  background: white;
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
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

const HistoryContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #f8f8f8;
  max-height: 150px;
  overflow-y: auto;
  z-index: 9;
`;

const HistoryItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
  }
`;
