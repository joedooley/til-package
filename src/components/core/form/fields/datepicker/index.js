import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { useController } from 'react-hook-form';
import Field from '../field';
import CalendarIcon from 'public/assets/icons/calendar.svg';
import DownArrowIcon from 'public/assets/icons/table/down-arrow.svg';

const ReactDatePicker = dynamic(() => import('react-datepicker'));

const FormFieldIcon = ({ variant, ...rest }) => {
  const isDatePicker = variant === 'date';
  const Icon = isDatePicker ? CalendarIcon : DownArrowIcon;

  return (
    <span
      {...rest}
      css={theme => css`
        svg {
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);

          &.down-arrow {
            path {
              fill: ${theme.colors.text};
              stroke: ${theme.colors.text};
            }
          }
        }
      `}
    >
      <Icon />
    </span>
  );
};

const filterPassedTime = time => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

export default function DatePicker({ name, label, variant = 'date', ...rest }) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name });

  const isTimePicker = variant === 'time';

  const timePickerProps = isTimePicker
    ? {
        dateFormat: 'h:mm aa',
        filterTime: filterPassedTime,
        showTimeSelect: true,
        showTimeSelectOnly: true,
      }
    : undefined;

  return (
    <Field
      name={name}
      label={label}
      required={rest.required}
      className={rest.className}
      css={css`
        .wrapper {
          position: relative;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        input {
          border: none;
        }
      `}
    >
      <div name={name} className="wrapper">
        <ReactDatePicker
          placeholderText={rest.placeholder}
          ref={ref}
          selected={value}
          {...inputProps}
          {...timePickerProps}
          {...rest}
        />
        <FormFieldIcon variant={variant} className={isTimePicker ? 'down-arrow' : ''} />
      </div>
    </Field>
  );
}

FormFieldIcon.propTypes = {
  variant: PropTypes.oneOf(['date', 'time']),
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['date', 'time']),
};
