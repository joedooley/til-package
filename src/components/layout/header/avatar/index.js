import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Dropdown from '@components/core/menu/dropdown';
import * as Styles from './styles';

export default function Avatar({ src, name, handleLogout }) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleMenuToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Styles.Container onClick={handleMenuToggle}>
      <Image src={src || '/assets/icons/user.svg'} height="34" width="34" />
      <Styles.Username>{name}</Styles.Username>
      <Dropdown active={showDropdown} handleLogout={handleLogout} />
    </Styles.Container>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
