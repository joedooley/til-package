import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex, Heading, Button, Text } from '@components/core/html';

const StyledContainer = styled(Flex)(
  ({ theme }) => css`
    background-color: ${theme.colors.black[400]};
    box-shadow: ${theme.shadows.modal};
    color: ${theme.colors.text};
    flex-direction: column;
    width: 100%;
  `
);

const StyledHeader = styled(Flex)(
  ({ theme }) => css`
    align-items: flex-start;
    border-bottom: ${theme.borders.secondary};
    flex-direction: column;
    justify-content: flex-start;
    padding: ${theme.space[3]};
    width: 100%;

    h5 {
      font-size: ${theme.fontSizes[3]};
    }

    p {
      font-weight: ${theme.fontWeights.light};
      margin-bottom: 0;
    }
  `
);

const StyledFooter = styled(Flex)(
  ({ theme }) => css`
    align-items: flex-start;
    justify-content: flex-start;
    padding: ${theme.space[3]};
    width: 100%;
  `
);

export default function DeleteUser(props) {
  return (
    <StyledContainer as="section">
      <StyledHeader as="header">
        <Heading level={5}>Delete Personal Account</Heading>
        <Text align="left">
          Permanently remove your Personal Account and all of its contents from the platform. This action is not
          reversible, so please continue with caution.
        </Text>
      </StyledHeader>

      <StyledFooter as="footer">
        <Button variant="warning" ariaLabel="Click button to delete your account">
          Delete Personal Account
        </Button>
      </StyledFooter>
    </StyledContainer>
  );
}

DeleteUser.propTypes = {};
