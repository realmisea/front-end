import styled from 'styled-components';
import Close from '@assets/images/close-button.svg';
import NeedData from '@assets/images/need/need.json';
import { useState } from 'react';
import { NeedDataType } from '../types/types.ts';

export const SuggestionModal = () => {
  const [currentState, setCurrentState] = useState('rainy');
  // const needData = needDataJson as NeedData
  const state = (NeedData as NeedDataType).states[currentState];

  return (
    <ModalContainer>
      <ModalHeaderContainer>
        <HeaderTitle>Wayther의 제안</HeaderTitle>
        <CloseBtn src={Close} />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <SuggestionContainer>
          <SuggestImg src={state.image} />
          <SuggestMessage>
            {Array.isArray(state.message) ? (
              state.message.map((line, index) => (
                <span key={index}>
                  {line} <br />
                </span>
              ))
            ) : (
              <span>{state.message}</span>
            )}
          </SuggestMessage>
        </SuggestionContainer>
        <SuggestionContainer>
          <SuggestImg src={state.image} />
          <SuggestMessage>
            {Array.isArray(state.message) ? (
              state.message.map((line, index) => (
                <span key={index}>
                  {line} <br />
                </span>
              ))
            ) : (
              <span>{state.message}</span>
            )}
          </SuggestMessage>
        </SuggestionContainer>
      </ModalBodyContainer>
    </ModalContainer>
  );
};

export const ModalContainer = styled.div`
  width: 694px;
  height: 333px;
  background: white;
  border: 3px solid ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
`;

export const ModalHeaderContainer = styled.div`
  width: 100%;
  height: 75px;
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
