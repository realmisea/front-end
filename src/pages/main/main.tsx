import styled from "styled-components";
import Cloud from '@assets/images/main-cloud.svg';
import SearchIcon from '@assets/images/search.svg';

export const MainPage = () => {

    return (
        <MainContainer>
            <Title>Wayther</Title>
            <InputContainer>
                <InputWrapper>
                    <Input defaultValue="출발지: " />
                    <SearchButton>
                        <img src={SearchIcon} alt="검색" />
                    </SearchButton>
                </InputWrapper>
                <InputWrapper>
                    <Input defaultValue="도착지: " />
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
  background: #FFEC8A;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 96px;
  color: #fffcfc;
  margin: 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  //background: greenyellow;
  margin-top: 52px;
  gap: 40px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 640px;
  height: 88px;
  //background: cornflowerblue;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  //background: white;
  border: 3px solid #c2c2c2;
  border-radius: 50px;
  font-size: 24px;
`

const SearchButton = styled.button`
  position: absolute;
  top: 19px;
  right: 21px;
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 68px; // 왼쪽에 이만큼 띄워야함 
`;


const CloudImg = styled.img`
  margin-bottom: -190px; // 여기 마진이 왜생기지?
  //background: greenyellow;
  
`
