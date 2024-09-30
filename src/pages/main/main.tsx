import styled from "styled-components";
import Cloud from '@assets/images/main-cloud.svg';
import SearchIcon from '@assets/images/search.svg';

export const MainPage = () => {

    return (
        <MainContainer>
            <Title>Wayther</Title>
            <InputContainer>
                <InputWrapper>
                    <LabelText>출발지: </LabelText>
                    <Input />
                    <SearchButton>
                        <img src={SearchIcon} alt="검색" />
                    </SearchButton>
                </InputWrapper>
                <InputWrapper>
                    <LabelText>도착지: </LabelText>
                    <Input />
                    <SearchButton>
                        <img src={SearchIcon} alt="검색" />
                    </SearchButton>
                </InputWrapper>
            </InputContainer>
            <CloudImg src={Cloud} alt="구름" />
        </MainContainer>
    )
}

const MainContainer = styled.div`
  width: 1280px;
  height: 832px;
  background: ${({theme}) => theme.colors.yellow};
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 96px;
  color: ${({theme}) => theme.colors.white};
  margin: 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
  gap: 40px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 640px;
  height: 88px;
  border: 3px solid ${({theme}) => theme.colors.gray};
  border-radius: 50px;
  background: white;
  
`

const LabelText = styled.span`
  font-size: 24px;
  padding: 0 15px 0 68px;
`

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 19px 0 30px;
`;


const CloudImg = styled.img`
  margin-bottom: -190px; // 여기 마진이 왜생기지?
  
`
