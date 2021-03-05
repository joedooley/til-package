import styled from '@emotion/styled';
import Menu from '@components/core/menu/list';

const Aside = styled('aside')(({ theme }) => ({
  backgroundColor: theme.colors.text,
  boxShadow: theme.shadows.small,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  minHeight: '100vh',
  minWidth: '220px',
  padding: `19px 30px ${theme.space[4]} 20px`,
  '& > *': {
    position: 'sticky',
    top: '19px',
  },
}));

const items = [
  {
    href: '/',
    value: 'TIL',
  },
  {
    href: '/dashboard',
    value: 'Dashboard',
  },
];

export default function Sidebar() {
  return (
    <Aside>
      <Menu items={items} />
    </Aside>
  );
}
