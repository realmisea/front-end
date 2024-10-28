import styled from 'styled-components';
import { transparentize } from 'polished';
// import Sun from '@assets/images/weather/sun.png';
import SunAndCloud from '@assets/images/weather/sun-and-cloud.png';
import Tip from '@assets/images/map/tip-button.svg';
import WeatherTime from '@assets/images/map/weather-time.svg';
import { useState } from 'react';
import { SuggestionModal } from '@components/SuggestionModal.tsx';
import { DetailModal } from '@components/DetailModal.tsx';

export const PointWeather = () => {
  const [isSuggestOpened, setIsSuggestOpened] = useState(false);
  const [isDetailOpened, setIsDetailOpened] = useState(false);

  const handleSuggestClick = () => {
    setIsSuggestOpened((prev) => !prev);
  };

  const handleDetailClick = () => {
    setIsDetailOpened((prev) => !prev);
  };

  return (
    <Container>
      <PlaceName>A 충주 휴게소</PlaceName>
      <WeatherBox>
        <WeatherImg src={SunAndCloud} />
        <WeatherInfo>
          <WeatherText>기온 32.2</WeatherText>
          <WeatherText>강수확률 70%</WeatherText>
          <WeatherText>대기질 보통</WeatherText>
        </WeatherInfo>
      </WeatherBox>
      <BtnBox>
        <SuggestBtn src={Tip} onClick={handleSuggestClick} />
        {isSuggestOpened && (
          <SuggestionModal
            onClose={() => {
              setIsSuggestOpened(false);
            }}
          />
        )}
        <DetailBtn src={WeatherTime} onClick={handleDetailClick} />
        {isDetailOpened && (
          <DetailModal
            onClose={() => {
              setIsDetailOpened(false);
            }}
          />
        )}
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 427px;
  height: 380px;
  background: ${({ theme }) => transparentize(0.6, theme.colors.yellow)};
  border-radius: 50px;
  border: 4px solid ${({ theme }) => theme.colors.yellow};
  gap: 10px;
  margin-left: 25px;
`;

const PlaceName = styled.h1`
  font-size: 40px;
  font-weight: bold;
  font-family:
    Noto Sans KR,
    serif;
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  //background: lightpink;
  gap: 30px;
`;

const WeatherImg = styled.img`
  width: 136px;
  height: 131px;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const WeatherText = styled.p`
  font-size: 32px;
  font-weight: bold;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 365px;
  height: 107px;
  border-radius: 30px;
  gap: 40px;
`;

const Btn = styled.img`
  width: 110px;
  //height: 100px;
  cursor: pointer;
`;

const SuggestBtn = styled(Btn)`
  //background: cornflowerblue;
`;

const DetailBtn = styled(Btn)`
  //background: darkseagreen;
`;
