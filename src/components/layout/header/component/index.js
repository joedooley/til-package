import * as React from 'react';
import Link from 'next/link';
import Logo from '../logo';
import * as Styles from './styles';

export default function Header() {
  return (
    <Styles.Header>
      <Link href="/" passHref>
        <Logo />
      </Link>
    </Styles.Header>
  );
}
