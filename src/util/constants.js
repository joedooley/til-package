import PropTypes from 'prop-types';

const userRoles = ['user', 'administrator'];

export const propTypes = {
  userState: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      role: PropTypes.oneOf(userRoles),
      avatar: PropTypes.string,
    }),
  }),
  children: PropTypes.node,
};

export const app = {
  site: {
    title: 'Til',
  },
  meta: {
    title: 'Til | Today I Learned',
    description: 'A simple solution to share knowledge within your organization or community.',
  },
};
