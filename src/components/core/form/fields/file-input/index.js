import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useController } from 'react-hook-form';
import Field from '../field';
import UploadIcon from 'public/assets/icons/upload.svg';

const BaseFileInput = React.forwardRef(({ onChange, value, ...rest }, ref) => {
  const [file, setFile] = React.useState(value);
  const placeholder = rest.placeholder || 'Select image to upload';
  const filename = !file ? placeholder : file.slice(12);

  const handleClick = () => {
    ref.current.click();
  };

  return (
    <div onClick={handleClick} className={rest.className}>
      <button
        type="button"
        tabIndex="0"
        css={theme => css`
          align-items: center;
          background: ${theme.colors.white.primary};
          border: ${theme.borders.primary};
          border-radius: ${theme.radii[2]};
          color: ${theme.colors.grey.secondary};
          display: flex;
          font-size: ${theme.fontSizes[2]};
          justify-content: space-between;
          line-height: 20px;
          padding: 4px 8px;
          width: 100%;
        `}
      >
        <span
          css={css`
            opacity: ${file ? 1 : 0.5};
          `}
        >
          {filename}
        </span>
        <UploadIcon />
      </button>

      <input
        {...rest}
        type="file"
        ref={ref}
        value={file}
        onChange={e => {
          e.preventDefault();
          setFile(e.target.value);
          onChange(e.target.files);
        }}
        css={css`
          display: none;
        `}
      />
    </div>
  );
});

export default function FileInput({ name, label, ...rest }) {
  const {
    field: { ref, ...inputProps },
  } = useController({ name });

  return (
    <Field name={name} label={label} required={rest.required} className={rest.className}>
      <BaseFileInput name={name} ref={ref} {...inputProps} {...rest} />
    </Field>
  );
}

BaseFileInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
