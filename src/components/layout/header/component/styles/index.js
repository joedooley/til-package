import styled from '@emotion/styled';

export const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.green.gradients.dark};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
`;
