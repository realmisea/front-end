import {
  CloseBtn,
  HeaderTitle,
  ModalBackground,
  ModalContainer,
  ModalHeaderContainer,
  ModalProps
} from './SuggestionModal.tsx';
import Close from '@assets/images/close-button.svg';
import styled from 'styled-components';
import { HourWeather } from '@components/HourWeather.tsx';
import { useForecastStore } from '../stores/forecastStore.ts';
import Sun from '@assets/images/weather/sun.png';
import SunAndCloud from '@assets/images/weather/sun-and-cloud.png';
import Cloud from '@assets/images/weather/cloudy.png';
import Moon from '@assets/images/weather/moon.png';
import MoonAndCloud from '@assets/images/weather/moon-and-cloud.png';
import CloudNight from '@assets/images/weather/darkness.png';

export const DetailModal = ({ onClose }: ModalProps) => {
  const forecast = useForecastStore((state) => state.forecast);

  const filteredForecast = forecast.filter((item) =>
    ['T1H', 'SKY'].includes(item.category)
  );
  // console.log(filteredForecast);

  // 하늘 상태에 따른 아이콘을 반환하는 함수
  const getSkyIcon = (sky: string, hour: number) => {
    const isNight = hour >= 20 || hour <= 7;
    if (sky === '1') return isNight ? Moon : Sun; // 맑음
    if (sky === '3') return isNight ? MoonAndCloud : SunAndCloud; // 구름 많음
    if (sky === '4') return isNight ? CloudNight : Cloud; // 흐림
    return Sun; // 기본값 근데 Sun 말고 다른 걸로 해야함 일단은 Sun으로
  };

  const hoursWeather = Array.from({ length: 5 }, (_, index) => {
    const time = filteredForecast[index]?.fcstTime || '';
    const hour = parseInt(time.slice(0, 2), 10);

    const temperature =
      filteredForecast.find(
        (item) => item.category === 'T1H' && item.fcstTime === time
      )?.fcstValue || 'N/A';

    const sky =
      filteredForecast.find(
        (item) => item.category === 'SKY' && item.fcstTime === time
      )?.fcstValue || '1';

    const skyIcon = getSkyIcon(sky, hour);

    return {
      time: `${hour}시`,
      temperature,
      skyIcon
    };
  });

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeaderContainer>
          <HeaderTitle>오늘의 시간별 예보</HeaderTitle>
          <CloseBtn src={Close} onClick={onClose} />
        </ModalHeaderContainer>
        <ModalBodyContainer>
          <DetailContainer>
            {hoursWeather.map((hour, index) => (
              <HourWeather
                key={index}
                time={hour.time}
                temperature={hour.temperature}
                skyIcon={hour.skyIcon}
              />
            ))}
          </DetailContainer>
        </ModalBodyContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBodyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 258px;
  padding: 10px 0 10px 0;
  //background: lightsalmon;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  //background: lightpink;
  //gap: 3px;
`;
