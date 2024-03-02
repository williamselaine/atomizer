import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';
import { Navigate } from 'react-router-dom';
import * as Routes from '../../constants/routes';
import { networkActions } from '../../redux/actions';

const goofyHeadings = ['whoa there', 'slow your roll', 'sorry partner', 'back it up', 'sorry'];
const goofyPlaceholders = [
  'kites are fun',
  'piano concerto no. 2',
  'pink in the night',
  'carter son',
  "carolyn's fingers",
  'is this music?',
  'running up that hill',
  'supercut',
  'that old feeling'
];

const SaveNetworkModal = React.forwardRef(({ cancel, confirm }, ref) => {
  const loadedNetworkName = useSelector(state => state.network.loadedNetworkName);
  const [name, setName] = useState(
    loadedNetworkName ? loadedNetworkName : goofyPlaceholders[Math.floor(Math.random() * goofyPlaceholders.length)]
  );
  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState(null);
  const networkToSave = useSelector(state => state.network.networkToSave);
  const shouldSaveNetwork = useSelector(state => state.network.shouldSaveNetwork);
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });

  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(networkActions.setShouldSaveNetwork(false));
    cancel();
  }, [cancel, dispatch]);

  const doSave = useCallback(() => {
  }, [confirm, id, name, networkToSave, onCancel]);

  if (shouldSaveNetwork && loadedNetworkName) {
    doSave();
  }

  if (!networkToSave && !profile.isEmpty) {
    dispatch(networkActions.saveNetwork());
  }

  useEffect(() => {
    const _onSave = () => {
    };

    const defaultContent = {
      header: 'name your bop',
      content: <input className={classes.input} type='text' placeholder={name} onChange={e => setName(e.target.value)} />,
      confirm: _onSave,
      confirmText: 'save'
    };

    setContent(
      profile.isEmpty
        ? {
            header: goofyHeadings[Math.floor(Math.random() * goofyHeadings.length)],
            content: <p className={classes.text}>you'll need to be logged in to do that</p>,
            confirmText: 'log in or sign up',
            buttonClass: classes.wideButton,
            buttonContainerClass: classes.wideButtonContainer,
            confirm: () => setRedirect(true)
          }
        : defaultContent
    );
  }, [cancel, classes, confirm, dispatch, doSave, id, name, networkToSave, profile]);

  return (
    <div className={classes.content} ref={ref}>
      {content && (
        <>
          <h3>{content.header}</h3>
          {content.content}
          <div className={`${classes.buttonContainer} ${content.buttonContainerClass}`}>
            <button className={`${classes.button} ${classes.cancelButton}`} onClick={onCancel}>
              cancel
            </button>
            <button
              className={`${classes.button} ${content.buttonClass ? content.buttonClass : classes.confirmButton}`}
              onClick={content.confirm}
            >
              {content.confirmText}
            </button>
          </div>
          {redirect && <Navigate to={Routes.LOG_IN} />}
        </>
      )}
    </div>
  );
});

export default SaveNetworkModal;
