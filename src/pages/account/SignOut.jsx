/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { configActions } from '../../redux/actions';

const SignOut = ({ classes }) => {
  const login = useSelector(state => state.config.login);
  const dispatch = useDispatch();

  const _logout = () => {
    dispatch(configActions.setLogin({ valid: false }));
  };

  return (
    <>
      <h4 type='button' onClick={_logout} className={classes.toolbarItem}>
        sign out
      </h4>
      {!login.valid && <Navigate to={ROUTES.HOME} />}
    </>
  );
};

export default SignOut;
