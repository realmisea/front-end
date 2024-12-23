import styled from 'styled-components';
import { transparentize } from 'polished';
import Tip from '@assets/images/map/tip-button.svg';
import WeatherTime from '@assets/images/map/weather-time.svg';
import { useEffect, useState } from 'react';
import { SuggestionModal } from '@components/SuggestionModal.tsx';
import { DetailModal } from '@components/DetailModal.tsx';
import { useForecastStore } from '../../stores/forecastStore.ts';
import Sun from '@assets/images/weather/sun.png';
import SunAndCloud from '@assets/images/weather/sun-and-cloud.png';
import Cloud from '@assets/images/weather/cloudy.png';
import Moon from '@assets/images/weather/moon.png';
import MoonAndCloud from '@assets/images/weather/moon-and-cloud.png';
import CloudNight from '@assets/images/weather/darkness.png';
import { RouteCoord } from '@components/Map/MapView.tsx';
import { getRegionName } from '@utils/getUtils.ts';
import { processRegionName } from '@utils/processRegionName.ts';
import { fetchDustGrade } from '@apis/dust.ts';

export const PointWeather = ({ title, lat, lng }: RouteCoord) => {
  const [isSuggestOpened, setIsSuggestOpened] = useState(false);
  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dust, setDust] = useState<string | null | undefined>(null);

  const { forecast, loadForecast } = useForecastStore();

  useEffect(() => {
    const fetchData = async () => {
      if (lat && lng) {
        setIsLoading(true);
        try {
          await loadForecast(lat, lng);

          const region = await getRegionName(lat, lng);
          const processedRegion = processRegionName(region);

          const dustGrade = await fetchDustGrade(processedRegion);
          setDust(dustGrade);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [lat, lng, loadForecast]);

  const handleSuggestClick = () => {
    setIsSuggestOpened((prev) => !prev);
  };

  const handleDetailClick = () => {
    setIsDetailOpened((prev) => !prev);
  };

  const getSkyIcon = (sky: string, hour: number) => {
    const isNight = hour >= 20 || hour <= 7;
    if (sky === '1') return isNight ? Moon : Sun; // 맑음
    if (sky === '3') return isNight ? MoonAndCloud : SunAndCloud; // 구름 많음
    if (sky === '4') return isNight ? CloudNight : Cloud; // 흐림
    return Sun; // 기본값 근데 Sun 말고 다른 걸로 해야함 일단은 Sun으로
  };

  const sky =
    forecast.find((item) => item.category === 'SKY')?.fcstValue || '1';
  const time =
    forecast.find((item) => item.category === 'SKY')?.fcstTime || '1200';
  const hour = parseInt(time.slice(0, 2), 10);
  const skyIcon = getSkyIcon(sky, hour);

  const temperature =
    forecast.find((item) => item.category === 'T1H')?.fcstValue || 'N/A';
  const rain =
    forecast.find((item) => item.category === 'RN1')?.fcstValue === '강수없음'
      ? '없음'
      : `${forecast.find((item) => item.category === 'RN1')?.fcstValue}` ||
        'N/A';

  return (
    <Container>
      {isLoading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          <PlaceName>{title}</PlaceName>
          <WeatherBox>
            <WeatherImg src={skyIcon} />
            <WeatherInfo>
              <WeatherText>기온 {temperature}°C</WeatherText>
              <WeatherText>강수량 {rain}</WeatherText>
              <WeatherText>대기질 {dust}</WeatherText>
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
        </>
      )}
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
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 380px;
    height: 300px;
    margin-left: 0;
    gap: 5px;
  }

  @media (max-width: 400px) {
    width: 350px;
  }
`;

export const LoadingMessage = styled.p`
  font-size: 30px;
  font-weight: bold;
  font-family:
    Noto Sans KR,
    serif;
`;

const PlaceName = styled.h1`
  font-size: 40px;
  font-weight: bold;
  font-family:
    Noto Sans KR,
    serif;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 30px;
`;

const WeatherImg = styled.img`
  width: 136px;
  height: 131px;

  @media (max-width: 768px) {
    width: 110px;
    height: auto;
  }
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

  @media (max-width: 768px) {
    font-size: 25px;
  }
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

  @media (max-width: 768px) {
    width: 300px;
    height: 90px;
  }
`;

const Btn = styled.img`
  width: 110px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 90px;
  }
`;

const SuggestBtn = styled(Btn)``;

const DetailBtn = styled(Btn)``;
