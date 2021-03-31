import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ErrorMessage as BaseErrorMessage } from '@hookform/error-message';

const StyledErrorMessage = styled('p')(
  ({ theme }) => css`
    color: ${theme.colors.error.primary};
    margin-bottom: 0;
    margin-top: ${theme.space[2]};
    text-align: left;
  `
);

export default function ErrorMessage({ children, name, errors, ...rest }) {
  return (
    <StyledErrorMessage className={rest.className}>
      <BaseErrorMessage name={name} errors={errors}>
        {children}
      </BaseErrorMessage>
    </StyledErrorMessage>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};
