import styled from 'styled-components';
import HomeIcon from '@assets/images/home.svg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderTitle>Wayther</HeaderTitle>
      <Button
        src={HomeIcon}
        onClick={() => {
          navigate(`/`);
        }}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 15vh;
  background: ${({ theme }) => theme.colors.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; // 부모

  @media (max-width: 768px) {
    height: 10vh;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 82px;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Noto Serif', serif;
  letter-spacing: -5px;

  @media (max-width: 768px) {
    font-size: 56px;
    letter-spacing: -3px;
  }

  @media (max-width: 480px) {
    font-size: 42px;
    letter-spacing: -2px;
  }
`;

const Button = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    right: 10px;
    top: 10px;
  }
`;
