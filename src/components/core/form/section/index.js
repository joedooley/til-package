import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const base = ({ theme }) => css`
  .heading {
    background: ${theme.colors.text};
    border-radius: ${theme.radii[2]};
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.semiBold};
    font-size: ${theme.fontSizes[4]};
    line-height: ${theme.lineHeights.default};
    padding: ${theme.space[1]} 20px;
  }

  .inner-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: ${theme.space[4]} 20px;
  }
`;

const FormSection = styled.section`
  ${base}
`;

export default function Section({ heading, children, ...rest }) {
  return (
    <FormSection {...rest}>
      {heading && <p className="heading">{heading}</p>}
      <div className="inner-container">{children}</div>
    </FormSection>
  );
}

Section.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
