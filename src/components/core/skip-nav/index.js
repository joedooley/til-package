import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledSkipNav = styled.a`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;

  &:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    z-index: 1;
    width: auto;
    height: auto;
    clip: auto;
  }
`;

const SkipNavLink = ({ children = 'Skip to content', contentId = 'maincontent', ...props }) => {
  return (
    <StyledSkipNav {...props} href={`#${contentId}`}>
      {children}
    </StyledSkipNav>
  );
};

const SkipNavContent = ({ id = 'maincontent', ...props }) => {
  return <div {...props} id={id} />;
};

SkipNavLink.propTypes = {
  children: PropTypes.node,
  contentId: PropTypes.string,
};

SkipNavContent.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export { SkipNavLink, SkipNavContent };
