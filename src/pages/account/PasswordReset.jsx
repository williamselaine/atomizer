import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import AccountStyles from './AccountStyles';
import { configActions } from '../../redux/actions';
import { LogInLink } from './LogIn';

const PasswordResetPage = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = AccountStyles({ theme: theme });
  return (
    <div className={`${classes.parent} ${classes.passwordParent}`}>
      <h2>reset password</h2>
      <PasswordResetForm classes={classes} />
    </div>
  );
};

const PasswordResetForm = ({ classes }) => {
  const [email, setEmail] = useState('');
  const login = useSelector(state => state.config.login);

  const dispatch = useDispatch();

  const onSubmit = () => {
  };

  const onChange = event => {
    setEmail(event.target.value);
  };

  const isInvalid = email === '';

  const onChangePage = () => {
    dispatch(configActions.setLogin({ valid: false, message: null }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input className={classes.input} name='email' value={email} onChange={onChange} type='text' placeholder='Email Address' />
        <button className={classes.button} disabled={isInvalid} type='submit'>
          Reset
        </button>
        {login && login.message && <p className={classes.message}>{login.message}</p>}
      </form>
      <LogInLink classes={classes} onClick={onChangePage} />
    </>
  );
};

const PasswordResetLink = ({ classes }) => {
  return (
    <p className={classes.message}>
      <Link to={ROUTES.PASSWORD_RESET}>forgot password?</Link>
    </p>
  );
};

export default PasswordResetPage;

export { PasswordResetForm, PasswordResetLink };
