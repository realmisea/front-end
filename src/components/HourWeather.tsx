import styled from 'styled-components';
import { HourWeatherProps, TempBoxProps } from '@types/weather.ts';

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
      <TempBox temperature={temperature}>{temperature}°C</TempBox>
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

const TempBox = styled.div<TempBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 28px;
  background: ${({ temperature }) =>
    temperature >= 30
      ? '#fc4103'
      : temperature >= 25
        ? '#fcba03'
        : temperature >= 16
          ? '#fcd303'
          : temperature >= 6
            ? '#82b2ff'
            : '#c9deff'};
  border-radius: 7px;
  font-weight: bold;
  font-size: 14px;
`;
