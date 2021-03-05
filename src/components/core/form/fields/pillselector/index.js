import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

const pillWrapper = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 22px;
`;

const SelectedCSS = ({ theme }) => css`
  align-items: center;
  border: ${theme.borders[1]};
  border-radius: ${theme.radii[4]};
  box-shadow: 0px 1px 2px #dde4e7;
  background-color: ${theme.colors.brand.primary};
  color: ${theme.colors.text};
  cursor: ${'pointer'};
  display: flex;
  font-size: ${theme.fontSizes[0]};
  font-weight: ${theme.fontWeights.normal};
  line-height: ${theme.lineHeights.default};
  justify-content: center;
  padding: 2px 10px 2px 10px;
  margin: 0px 12px 0px 0px;

  &:active {
    background-color: ${theme.colors.text};
    color: ${theme.colors.black.primary};
  }
  &:focus {
    outline: 0 !important;
  }
`;

const UnselectedCSS = ({ theme }) => css`
  align-items: center;
  border: ${theme.borders[1]};
  border-radius: ${theme.radii[4]};
  box-shadow: 0px 1px 2px #dde4e7;
  background-color: ${theme.colors.text};
  border-color: ${theme.colors.text};
  cursor: ${'pointer'};
  display: flex;
  font-size: ${theme.fontSizes[0]};
  font-weight: ${theme.fontWeights.normal};
  line-height: ${theme.lineHeights.default};
  justify-content: center;
  padding: 2px 10px 2px 10px;
  margin: 0px 12px 0px 0px;

  &:active {
    background-color: ${theme.colors.brand.primary};
    color: ${theme.colors.text};
  }

  &:focus {
    outline: 0 !important;
  }
`;

const StyledComponent = styled.div(props => (props.selected ? SelectedCSS(props) : UnselectedCSS(props)));

export default function Pill({ id, value, name, options, label, className, all }) {
  const { register, setValue, watch } = useFormContext();
  const values = watch(name);
  const selected = new Set((Array.isArray(values) ? values.map(v => `${v[id] ?? v}`) : values)?.split?.(',') ?? []);

  return (
    <div css={pillWrapper}>
      <label style={{ width: '100%' }}>{label}</label>
      <input type="hidden" ref={register()} name={name} />
      {all && (
        <StyledComponent onClick={() => setValue(name, options.map(v => `${v[id] ?? v}`).join(','))}>
          {all}
        </StyledComponent>
      )}

      {options.map((option, index) => {
        const key = option[id] ?? option;
        const val = option[value] ?? key;

        return (
          val && (
            <StyledComponent
              key={`${option}${index}`}
              className={className}
              onClick={() => {
                selected.has(`${key}`) ? selected.delete(`${key}`) : selected.add(`${key}`);
                setValue(name, Array.from(selected).join(','));
              }}
              selected={selected.has(`${key}`)}
            >
              {val}
            </StyledComponent>
          )
        );
      })}
    </div>
  );
}

Pill.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  all: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};
