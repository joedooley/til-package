import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export default function Fetch(props) {
  const [state, setState] = React.useState({ data: undefined, loading: false, error: false });
  const cancelToken = React.useRef(null);
  
  return <div></div>;
}

Fetch.propTypes = {};
