import * as React from 'react';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import { client } from '@util/api-client';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const reducer = (draft, action) => {
  switch (action.type) {
    case 'SET_USER':
      draft.user = action.payload;
      draft.loading = false;
      draft.status = 'idle';

      return;
    case 'UPDATE_USER':
      draft.user = action.payload.user;

      return;
    case 'SET_LOADING':
      draft.loading = action.payload;

      return;
    case 'SET_ERROR':
      draft.loading = false;
      draft.status = 'error';
      draft.error = action.payload;

      return;
    case 'FETCH_START':
      draft.loading = true;
      draft.status = 'fetching';
      draft.error = null;

      return;
    default:
      throw new Error(`UserProvider: Unknown action ${action.type}`);
  }
};

async function getUser(dispatch) {
  dispatch({ type: 'FETCH_START' });
  console.log(`getUser called`);

  return client('/api/user/me')
    .then(response => dispatch({ type: 'SET_USER', payload: response.data.user }))
    .catch(error => {
      console.error(`error`, error);
      dispatch({ type: 'SET_ERROR', payload: error });
    });
}

const initialState = { user: null, error: null, loading: false, status: 'idle' };

export const UserProvider = ({ isDashboard, children }) => {
  const [state, dispatch] = React.useReducer(produce(reducer), initialState);
  const { user, loading, status } = state;

  React.useEffect(() => {
    const hasUidCookie = document.cookie.includes('uid');

    if (status === 'error') return;
    if (!user && !loading && hasUidCookie && isDashboard) {
      getUser(dispatch).catch(error => {
        console.error('UserProvider getUser:', error);
      });
    }
  }, [status, user, loading, isDashboard]);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>{children}</UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUser = () => React.useContext(UserStateContext);
export const useDispatchUser = () => React.useContext(UserDispatchContext);

UserProvider.propTypes = {
  isDashboard: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
