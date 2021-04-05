import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ErrorMessage as BaseErrorMessage } from '@hookform/error-message';
import { Text } from '@components/core/html';
import ErrorIcon from 'public/assets/icons/exclamation-point.svg';

const StyledErrorMessage = styled(Text)(
  ({ theme }) => css`
    align-items: center;
    color: ${theme.colors.error.primary};
    display: flex;
    margin-bottom: 0;
    margin-top: ${theme.space[2]};
    text-align: left;

    svg,
    b {
      margin-right: 5px;
    }

    span {
      color: ${theme.colors.error.primary};
    }
  `
);

export default function ErrorMessage({ children, name, errors, ...rest }) {
  return (
    <StyledErrorMessage className={rest.className}>
      {errors[name] && (
        <>
          <ErrorIcon height="20" width="20" /> <b>Error: </b>
        </>
      )}
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
