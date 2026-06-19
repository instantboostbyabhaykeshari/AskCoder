'use client';

import {useEffect} from 'react';
import {Provider} from 'react-redux';

import Alert from '../Alert/Alert.component';
import Header from '../organisms/Header/Header.component';
import store from '../../redux/store';
import {loadUser} from '../../redux/auth/auth.actions';
import setAuthToken from '../../redux/auth/auth.utils';

const AppProviders = ({children}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Alert />
      {children}
    </Provider>
  );
};

export default AppProviders;
