import * as React from 'react';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import Label from '../../label';

const cloneElement = (element, props) =>
  jsx(element.type, {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
  });

export default function Field({ name, label, children, ...rest }) {
  const { errors } = useFormContext();
  const hasError = errors?.[name] !== undefined;

  return (
    <div
      className={rest.className}
      css={theme => css`
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;

        .count {
          color: ${hasError ? theme.colors.error.primary : theme.colors.text};
        }
      `}
    >
      {label && (
        <Label
          htmlFor={name}
          css={theme => css`
            color: ${hasError ? theme.colors.error.primary : theme.colors.text};
            span {
              color: ${theme.colors.error.primary};
            }
          `}
        >
          {label}
          {rest.required && <span>*</span>}
        </Label>
      )}

      {React.Children.map(children, child => {
        return child?.props?.name && React.isValidElement(child)
          ? cloneElement(child, {
              ...child.props,
              key: child.props.name,
              css: theme => css`
                border: ${hasError
                  ? `1px solid ${theme.colors.error.primary}`
                  : `1px solid ${theme.colors.border.secondary}`};
                outline: none;
              `,
            })
          : child;
      })}
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.node,
};
