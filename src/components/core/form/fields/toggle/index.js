import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../../../../styles/theme';

const UncheckedCSS = props => css`
  width: 45px;
  background: #ced4da;
  border-radius: 50px;
  height: 18px;
  position: relative;
  transition: all 0.1s ease-in-out;
  cursor: ${props.onChange === undefined || props.disabled ? 'not-allowed' : 'pointer'};

  &:after {
    content: '';
    transition: all 0.1s ease-in-out;
    width: 22px;
    height: 22px;
    background: white;
    border: 1px solid #ced4da;
    position: absolute;
    left: 0;
    top: -3px;
    border-radius: 50%;
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const CheckedCSS = props => css`
  ${UncheckedCSS(props)}
  background: linear-gradient(0deg, rgba(0, 85, 48, 0.1), rgba(0, 85, 48, 0.1)), #ffffff;

  &:after {
    background: #01683a;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.7832 1.74242C11.9277 1.88384 12 2.05555 12 2.25758C12 2.4596 11.9277 2.63131 11.7832 2.77273L5.12516 9.28788C4.98064 9.42929 4.80516 9.5 4.59871 9.5C4.39226 9.5 4.21677 9.42929 4.07226 9.28788L0.216774 5.51515C0.0722573 5.37374 0 5.20202 0 5C0 4.79798 0.0722573 4.62626 0.216774 4.48485L1.26968 3.45455C1.41419 3.31313 1.58968 3.24242 1.79613 3.24242C2.00258 3.24242 2.17806 3.31313 2.32258 3.45455L4.59871 5.68939L9.67742 0.712121C9.82194 0.570706 9.99742 0.5 10.2039 0.5C10.4103 0.5 10.5858 0.570706 10.7303 0.712121L11.7832 1.74242Z' fill='white'/%3E%3C/svg%3E%0A");
    background-position: center center;
    background-repeat: no-repeat;
    border: 1px solid #01683a;
    left: initial;
    left: 50%;
  }
`;

const InputField = styled.div(props => (props.checked ? CheckedCSS(props) : UncheckedCSS(props)));
export default function Toggle(props) {
  return (
    <label
      css={css`
        display: block;
        padding: ${theme.space[2]}px ${theme.space[3]}px;
      `}
    >
      <input
        type="checkbox"
        checked={props.checked}
        readOnly
        css={css`
          height: 0;
          margin: 0;
          padding: 0;
          display: none;
          width: 0;
          visibility: hidden;
        `}
      />
      <InputField {...props} />
    </label>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
