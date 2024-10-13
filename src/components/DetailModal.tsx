import {CloseBtn, HeaderTitle, ModalContainer, ModalHeaderContainer} from "./SuggestionModal.tsx";
import Close from '@assets/images/close-button.svg';
import styled from "styled-components";
import {HourWeather} from "./HourWeather.tsx";

export const DetailModal = () => {

    return (
        <ModalContainer>
            <ModalHeaderContainer>
                <HeaderTitle>오늘의 상세 날씨</HeaderTitle>
                <CloseBtn src={Close} />
            </ModalHeaderContainer>
            <ModalBodyContainer>
                <WeatherContainer>
                    <SubTitle>시간별 예보</SubTitle>
                    <DetailContainer>
                        <HourWeather />
                        <HourWeather />
                        <HourWeather />
                        <HourWeather />
                        <HourWeather />
                    </DetailContainer>
                </WeatherContainer>
                <AirContainer>
                    <SubTitle>통합 대기</SubTitle>
                    <DetailContainer>대기 띄움</DetailContainer>
                </AirContainer>
            </ModalBodyContainer>
        </ModalContainer>
    )
};

const ModalBodyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 258px;
  background: lightsalmon;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  border: 1px solid black;
`

const WeatherContainer = styled(SubContainer)`
  width: 60%;
  background: burlywood;
`

const AirContainer = styled(SubContainer)`
  background: greenyellow;
  width: 40%;
`

const SubTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0 15px 0;
`
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: lightpink;
  gap: 3px;
`
