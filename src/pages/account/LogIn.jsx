import React, { useState } from 'react';
import { SignUpLink } from './SignUp';
import { PasswordResetLink } from './PasswordReset';
import * as Routes from '../../constants/routes';
import { Navigate } from 'react-router-dom';
import AccountStyles from './AccountStyles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = AccountStyles({ theme: theme });

  return (
    <div className={classes.parent}>
      <h2>log in</h2>
      <LogInForm />
      <PasswordResetLink classes={classes} />
      <SignUpLink classes={classes} />
    </div>
  );
};

const INITIAL_STATE = {
  email: '',
  password: ''
};

const LogInForm = () => {
  const [content, setContent] = useState({ ...INITIAL_STATE });
  const theme = useSelector(state => state.network.theme);
  const login = useSelector(state => state.config.login);
  if (login && typeof login.message !== 'boolean') {
    login.message = null;
  }

  const classes = AccountStyles({ theme: theme });

  const onSubmit = () => {};

  const onChange = event => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  const isInvalid = content.password === '' || content.email === '';

  return (
    <>
      <form onSubmit={onSubmit}>
        <input className={classes.input} name='email' value={content.email} onChange={onChange} type='text' placeholder='email' />
        <input
          className={classes.input}
          name='password'
          value={content.password}
          onChange={onChange}
          type='password'
          placeholder='password'
        />
        <button className={classes.button} disabled={isInvalid} type='submit'>
          Sign In
        </button>
        {login && login.message && (
          <p className={`${classes.message} ${classes.offset} ${classes.error}`}>
            check your username and password and try again
          </p>
        )}
      </form>
      {login && login.valid && <Navigate to={Routes.HOME} />}
    </>
  );
};

const LogInLink = ({ classes, onClick }) => {
  return (
    <p className={classes.message}>
      <Link to={Routes.LOG_IN} onClick={onClick}>
        back to login
      </Link>
    </p>
  );
};

export default LogIn;

export { LogInLink };
