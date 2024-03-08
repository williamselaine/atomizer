import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';

const WarnMobileModal = React.forwardRef(({ cancel }, ref) => {
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  return (
    <div className={`${classes.content} ${classes.backedContent}`} ref={ref}>
      <h2>look at you</h2>
      <h4 className={classes.subtitle}>with your little cell phone...</h4>
      <p className={classes.longText}>{`so glad you're here! you can try this thing out on mobile but i can't promise a perfect user experience. give it a go on desktop sometime too!`}</p>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.confirmButton}`} onClick={cancel}>
          roger
        </button>
      </div>
    </div>
  );
});

export default WarnMobileModal;
