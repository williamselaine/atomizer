import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { configActions, networkActions } from '../redux/actions';

const useLoadFirestoreValues = (theme, hotkeys, login) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(networkActions.setTheme(theme));
  }, [dispatch, theme]);

  useEffect(() => {
    dispatch(configActions.setHotkeys(hotkeys));
  }, [dispatch, hotkeys]);

  useEffect(() => {
    if (!isEmpty(auth) && !isEmpty(profile)) {
      dispatch(configActions.setLogin({ valid: true }));
    }
  }, [dispatch, login, auth, profile]);
};

export default useLoadFirestoreValues;
