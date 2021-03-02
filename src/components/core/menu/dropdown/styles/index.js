import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import BaseMenuLink from '../menu-link';

export const MenuIcon = styled.div`
  display: flex;

  img {
    transform: ${props => (props.active ? 'rotate(180deg)' : 'unset')};
    transition: transform 1s;
  }
`;

export const Nav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
`;

// @TODO Revisit when adding the table filter dropdowns.
// @TODO Magic numbers. Needs ref for computed sizes
export const Menu = styled(motion.ul)`
  background: ${({ theme }) => theme.colors.green.gradients.dark};
  list-style: none;
  margin: 0;
  position: absolute;
  right: -10px;
  top: 31px;
  padding: 0px 30px;
`;

export const MenuItem = styled.li`
  margin-bottom: 8px;
  padding: 10px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MenuLink = styled(BaseMenuLink)`
  align-items: center;
  color: ${({ theme }) => theme.colors.white.primary};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.normal};
  font-style: normal;
  font-weight: bold;
  font-weight: ${props => (props?.active ? 'bold' : 'normal')};
  font-size: 15px;
  line-height: 22px;
  text-decoration: none;
`;
