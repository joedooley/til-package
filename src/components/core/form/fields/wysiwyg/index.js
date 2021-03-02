import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Editor, Toolbar, BtnBold, BtnItalic, BtnNumberedList, BtnBulletList, Separator } from 'react-simple-wysiwyg';
import Label from '../../label';

const base = ({ theme, error }) => css`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  label {
    color: ${error ? theme.colors.red.primary : theme.colors.grey.inactive};

    .required {
      color: ${theme.colors.red.primary};
    }
  }

  & > div {
    border-color: ${error ? theme.colors.red.primary : theme.colors.grey.border} !important;
    outline-color: ${error ? theme.colors.red.primary : theme.colors.grey.border} !important;
  }

  .toolbar {
    background: ${theme.colors.white.primary} !important;
    padding: ${theme.space[2]};

    button {
      cursor: pointer;
      border-radius: ${theme.radii[2]};
    }
  }

  .description {
    padding: 6px 8px !important;
  }

  ul {
    margin: 0;
    padding: 0 0 0 23px;

    li {
      word-break: break-word;

      span {
        margin-left: -5px;
      }
    }
  }
`;

const FormFieldContainer = styled.div`
  ${base}
`;

const BaseComponent = props => {
  const { name, value, onChange, label, required } = props;
  const { errors } = useFormContext();
  const hasError = errors?.[name] !== undefined;

  return (
    <FormFieldContainer error={hasError} className="wysiwyg">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}

      <Editor value={value} onChange={onChange} className="description" {...props}>
        <Toolbar className="toolbar">
          <BtnBold />
          <BtnItalic />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
        </Toolbar>
      </Editor>
    </FormFieldContainer>
  );
};

export default function Wysiwyg(props) {
  return (
    <Controller
      name={props.name}
      label={props.label}
      defaultValue=""
      render={({ value, onChange }) => {
        return <BaseComponent value={value} onChange={onChange} {...props} />;
      }}
    />
  );
}

BaseComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

Wysiwyg.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
