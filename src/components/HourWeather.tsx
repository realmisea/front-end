import styled from "styled-components";
import Sun from '@assets/images/weather/sun.png';

export const HourWeather = () => {
    return(
        <WeatherContainer>
            <p>12시</p>
            <WeatherIcon src={Sun} />
            <Line />
            <TempBox>29</TempBox>
        </WeatherContainer>
    )
}

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 18%;
  gap: 10px;
  background: cornflowerblue;
`

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
`

const Line = styled.div`
  width: 150px;
  height: 1px;
  background: black;
`

const TempBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 28px;
  background: orange;
  border-radius: 7px;
  font-weight: bold;
`
