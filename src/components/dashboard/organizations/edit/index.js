import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';
import EditOrganizationForm from './form';

const StyledContainer = styled(Flex)(
  ({ theme }) => css`
    background-color: ${theme.colors.black[400]};
    box-shadow: ${theme.shadows.modal};
    color: ${theme.colors.text};
    flex-direction: column;
    width: 100%;
  `
);

export default function EditOrganization(props) {
  return (
    <StyledContainer {...props} as="section">
      <EditOrganizationForm />
    </StyledContainer>
  );
}

EditOrganization.propTypes = {};
