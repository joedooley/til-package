import styled from '@emotion/styled';

export const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const Username = styled.p`
  font-family: ${({ theme }) => theme.fonts.normal};
  font-style: normal;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white.primary};
  margin: 0 0 0 10px;
`;
