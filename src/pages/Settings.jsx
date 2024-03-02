import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Theme from '../stylesheets/Theme';
import { makeStyles } from '@mui/styles';
import { defaultConfig } from '../config';
import { Navigate } from 'react-router-dom';
import * as Routes from '../constants/routes';

const Settings = () => {
  const id = 'default';
  const screenInfo = useSelector(state => state.view.screenInfo);
  const login = useSelector(state => state.config.login);
  const hotkeys = useSelector(state => state.config.hotkeys);
  const theme = useSelector(state => state.network.theme);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    sliderLabel: {
      display: 'block',
      fontFamily: 'Roboto Condensed',
      color: theme && theme.text
    },
    vertical: {
      textAlign: 'center',
      width: '80%',
      marginBottom: '5px'
    },
    toggle: {
      margin: '20px 20px 20px 0px'
    },
    button: {
      margin: '20px 20px 20px 0px',
      display: 'block',
      width: '150px',
      height: '40px',
      backgroundColor: theme && theme.background,
      color: theme && theme.text,
      borderWidth: '2px',
      borderColor: theme && theme.text,
      fontSize: '16px',
      '&:disabled': {
        visibility: 'hidden'
      }
    },
    delete: {
      color: theme && theme.alertText,
      borderColor: theme && theme.alertText
    }
  });

  const classes = useStyles();

  useEffect(() => {
    setShow(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;
    dispatch(networkActions.setTheme(newTheme));
  };

  const toggleHotkeys = () => {
    const newHotkeys = !hotkeys;
    dispatch(configActions.setHotkeys(newHotkeys));
  };

  const restoreDefaults = () => {
    dispatch(networkActions.setTheme(Theme[defaultConfig.theme]));
    dispatch(configActions.setHotkeys(defaultConfig.hotkeys));
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        <span className={classes.toggle}>
          <p className={classes.sliderLabel}>theme</p>
          <label className='switch'>
            <input type='checkbox' onChange={toggleTheme} defaultChecked={theme === Theme.dark} tabIndex='0' />
            <span className='toggleSlider'></span>
          </label>
        </span>
        {!screenInfo.isMobile && (
          <span className={classes.toggle}>
            <p className={classes.sliderLabel}>hotkeys</p>
            <label className='switch'>
              <input type='checkbox' onChange={toggleHotkeys} defaultChecked={hotkeys} tabIndex='0' />
              <span className='toggleSlider'></span>
            </label>
          </span>
        )}
        <button className={classes.button} onClick={restoreDefaults}>
          restore defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
