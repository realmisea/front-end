import styled from 'styled-components';
import { HourWeatherProps } from '@types/weather.ts';

export const HourWeather = ({
  time,
  temperature,
  skyIcon
}: HourWeatherProps) => {
  return (
    <WeatherContainer>
      <p>{time}</p>
      <WeatherIcon src={skyIcon} />
      <Line />
      <TempBox>{temperature}°C</TempBox>
    </WeatherContainer>
  );
};

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 18%;
  gap: 10px;
  /* background: cornflowerblue; */
`;

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Line = styled.div`
  width: 200px;
  height: 1px;
  background: black;
`;

const TempBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 28px;
  background: orange;
  border-radius: 7px;
  font-weight: bold;
  font-size: 15px;
`;
