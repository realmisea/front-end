import styled from "styled-components";
import Close from '@assets/images/close-button.svg';

export const SuggestionModal = () => {
    return (
        <ModalContainer>
            <ModalHeaderContainer>
                <HeaderTitle>Wayther의 제안</HeaderTitle>
                <CloseBtn src={Close} />
            </ModalHeaderContainer>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
  width: 694px;
  height: 333px;
  background: white;
  border: 3px solid ${({theme}) => theme.colors.black};
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
`

const ModalHeaderContainer = styled.div`
  width: 100%;
  height: 75px;
  background: ${({theme}) => theme.colors.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const HeaderTitle = styled.h1`
  font-size: 40px;
  font-weight: 400;
`

const CloseBtn = styled.img`
  position: absolute;
  cursor: pointer;
  top: 3px;
  right: 3px;
`
