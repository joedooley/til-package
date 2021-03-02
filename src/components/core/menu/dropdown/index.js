import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import * as Styles from './styles';

export default function Dropdown({ active, handleLogout }) {
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.25,
        delay: 0.3,
      },
      display: 'block',
    },
    exit: {
      opacity: 1,
      rotateX: -15,
      transition: {
        duration: 0.25,
        delay: 0.3,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <Styles.Nav>
      <Styles.MenuIcon active={active}>
        <Image src="/assets/icons/menu/down-arrow.svg" height="4" width="9" />
      </Styles.MenuIcon>
      <Styles.Menu initial="exit" animate={active ? 'enter' : 'exit'} variants={subMenuAnimate}>
        <Styles.MenuItem>
          <Styles.MenuLink onClick={handleLogout}>Logout</Styles.MenuLink>
        </Styles.MenuItem>
      </Styles.Menu>
    </Styles.Nav>
  );
}

Dropdown.propTypes = {
  active: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
};
