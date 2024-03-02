import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { BrowserRouter } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/menus/navbar/Navbar';
import Audio from './audio/Audio';
import useResizer from './utils/useResizer';
import './stylesheets/App.scss';

// I don't use this theme, I just need backwards compatibility for deprecated Material-UI makestyles
const _theme = createTheme();

const App = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const theme = useSelector(state => state.network.theme);
  const targetElement = document.querySelector('#root');
  targetElement.style.backgroundColor = theme && theme.background;
  disableBodyScroll(targetElement);

  useResizer();

  useEffect(() => {
    setShowLoadingScreen(true);
    setTimeout(() => setShowLoadingScreen(false), 3000);
  }, []);

  useEffect(() => {
    const initializeMasterGain = () => {
      Audio.masterGainNode.gain.setValueAtTime(0.0, Audio.context.currentTime);
      Audio.preampGainNode.connect(Audio.masterGainNode);
      Audio.masterGainNode.connect(Audio.context.destination);
      Audio.monkeyPatch();
      Audio.unlockAudioContext();
    };
    initializeMasterGain();
  }, []);

  return (
    <ThemeProvider theme={_theme}>
      <BrowserRouter>
        <LoadingScreen show={showLoadingScreen} />
        {!showLoadingScreen && <Navbar />}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
