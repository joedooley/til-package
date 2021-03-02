import styled from '@emotion/styled';
import { color, fontSize, fontWeight, space } from '../../buttton/node_modules/theme/utils';
import BaseButton from '@components/base/Button/GoodButton';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h4`
  font-size: ${fontSize(3)};
  font-weight: ${fontWeight('bold')};
  margin-bottom: ${space(4)};
  margin-top: 0;
  text-align: center;
`;

export const Message = styled.pre`
  color: ${color('cm.red.primary')};
  margin-bottom: ${space(5)};
  padding: 0;
  white-space: pre-wrap;
`;

export const Button = styled(BaseButton)`
  /* color: ${color('cm.red.primary')}; */
`;
