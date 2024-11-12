import styled from 'styled-components';
import SearchIcon from '@assets/images/map/search.svg';

interface PlaceInputProps {
  title: string;
}

export const PlaceInput = ({ title }: PlaceInputProps) => {
  // console.log(title);
  return (
    <InputContainer>
      <InputText>{title}</InputText>
      <SearchImg src={SearchIcon} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 357px;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
`;

const InputText = styled.p`
  font-size: 24px;
  margin-left: 27px;
`;

const SearchImg = styled.img`
  margin-right: 27px;
  cursor: pointer;
`;
