import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Route, NavLink, Routes } from 'react-router-dom';
import useNavbarStyles from './NavbarStyles';
import * as Components from '../../../pages';
import { Modal } from '../../modals';
import * as PageRoutes from '../../../constants/routes';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';

export default function Navbar() {
  const theme = useSelector(state => state.network.theme);
  const { screenInfo, labVisible } = useSelector(state => state.view);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isOnHome, setIsOnHome] = useState(location.pathname === PageRoutes.HOME);
  const classes = useNavbarStyles({ theme: theme, screenInfo: screenInfo, labVisible: labVisible, isOnHome: isOnHome });

  const getClassName = route => {
    return `${classes.toolbarItem} ${location.pathname === route && classes.active}`;
  };
  useEffect(() => {
    if (!labVisible && !screenInfo.isMobile) {
      setIsOpen(false);
    }
  }, [labVisible, screenInfo.isMobile]);

  useEffect(() => {
    const isHome = location.pathname === PageRoutes.HOME;
    setIsOnHome(isHome);
    if (!isHome) {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      <header className={classes.titleHeader}>
        <button
          className={`${classes.hamburgerButton} ${
            screenInfo.isMobile || (!screenInfo.isMobile && labVisible && isOnHome) ? classes.showBurger : classes.hideBurger
          }`}
          onClick={() => (screenInfo.isMobile || (!screenInfo.isMobile && labVisible && isOnHome)) && setIsOpen(!isOpen)}
        >
          <Icon className={classes.hamburgerIcon} path={IconSet.hamburger} fill={theme && theme.text} viewBox='0 0 30 30' />
        </button>
        <div
          className={`${classes.floatRight} ${
            isOpen ? classes.show : (screenInfo.isMobile || (labVisible && isOnHome)) && classes.hide
          }`}
        >
          <NavLink to={PageRoutes.HOME} className={getClassName(PageRoutes.HOME)}>
            home
          </NavLink>
          <NavLink to={PageRoutes.SETTINGS} className={getClassName(PageRoutes.SETTINGS)}>
            settings
          </NavLink>
        </div>

        <h1 className={isOpen ? classes.hide : classes.show}>
          <NavLink to='/'>atomizer</NavLink>
        </h1>
      </header>
      <div id='body' className={classes.body}>
        <Modal />
        <Routes>
          <Route path={PageRoutes.HOME} element={<Components.Home />} />
          <Route path={PageRoutes.SETTINGS} element={<Components.Settings />} />
        </Routes>
      </div>
    </>
  );
}
