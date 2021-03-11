import * as React from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '@lib/firebase/db-admin.js';
import PageTitle from '@components/core/page/title.js';

export default function Index(props) {
  console.log(`props`, props);

  return <PageTitle {...props} value="Today I Learned" />;
}

export async function getStaticProps(context) {
  const { users } = await getAllUsers();

  return {
    props: {
      data: users,
    },
    revalidate: 1,
  };
}

Index.propTypes = {
  data: PropTypes.array,
};
