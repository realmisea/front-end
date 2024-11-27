import styled from 'styled-components';
import Close from '@assets/images/close-button.svg';
import NeedData from '@assets/images/need/need.json';
import { useEffect, useState } from 'react';
import { NeedDataType } from '../types/types.ts';
import { useForecastStore } from '../stores/forecastStore.ts';

export interface ModalProps {
  onClose: () => void;
}

export const SuggestionModal = ({ onClose }: ModalProps) => {
  const [currentStates, setCurrentStates] = useState<string[]>([]);
  const forecast = useForecastStore((state) => state.forecast);

  useEffect(() => {
    if (forecast.length > 0) {
      const states: string[] = [];

      const rainForecast = forecast
        .filter((item) => item.category === 'RN1')
        .slice(0, 5);
      const hasRain = rainForecast.some(
        (item) =>
          item.fcstValue !== '강수없음' && parseFloat(item.fcstValue) > 0
      );
      if (hasRain) states.push('rainy');

      const tempForecast = forecast
        .filter((item) => item.category === 'T1H')
        .slice(0, 5);
      const isSunny = tempForecast.some(
        (item) => parseFloat(item.fcstValue) >= 28
      );
      const isCold = tempForecast.some(
        (item) => parseFloat(item.fcstValue) <= 8
      );
      if (isSunny) states.push('sunny');
      if (isCold) states.push('cold');

      setCurrentStates(states);
    }
  }, [forecast]);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeaderContainer>
          <HeaderTitle>Wayther의 제안</HeaderTitle>
          <CloseBtn src={Close} onClick={onClose} />
        </ModalHeaderContainer>
        <ModalBodyContainer>
          {currentStates.length > 0 ? (
            currentStates.map((stateKey, index) => {
              const state = (NeedData as NeedDataType).states[stateKey];
              return (
                <SuggestionContainer key={index}>
                  <SuggestImg src={state.image} />
                  <SuggestMessage>
                    {Array.isArray(state.message)
                      ? state.message.map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))
                      : state.message}
                  </SuggestMessage>
                </SuggestionContainer>
              );
            })
          ) : (
            <p>날씨 데이터를 불러오는 중입니다...</p>
          )}
        </ModalBodyContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  width: 694px;
  height: 333px;
  background: white;
  border: 3px solid ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalHeaderContainer = styled.div`
  width: 100%;
  height: 68px;
  background: ${({ theme }) => theme.colors.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 40px;
  font-weight: 400;
`;

export const CloseBtn = styled.img`
  position: absolute;
  cursor: pointer;
  top: 3px;
  right: 3px;
`;

export const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  //background: lightskyblue;
  width: 100%;
  height: 258px;
`;

const SuggestionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  //background: lightsalmon;
`;

const SuggestImg = styled.img`
  height: 50px;
`;

const SuggestMessage = styled.p`
  font-size: 30px;
`;
