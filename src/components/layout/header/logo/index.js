import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Logo = React.forwardRef(({ href, onClick }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Image src="/assets/icons/logo.svg" height="34" width="196" />
    </a>
  );
});

Logo.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
};

Logo.displayName = 'Logo';

export default Logo;
