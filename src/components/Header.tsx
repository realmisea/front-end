import styled from "styled-components";

export const Header = () => {

    return (
        <HeaderContainer>
            <HeaderTitle>Wayther</HeaderTitle>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 163px;
  background: ${({theme}) => theme.colors.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderTitle = styled.h1`
  font-size: 82px;
  color: ${({theme}) => theme.colors.white};
  font-family: "Noto Serif", serif;
  letter-spacing : -5px;
`
