import styled from 'styled-components';

interface PlaceInputProps {
  title: string;
}

export const PlaceInput = ({ title }: PlaceInputProps) => {
  return (
    <InputContainer>
      <InputText>{title}</InputText>
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
