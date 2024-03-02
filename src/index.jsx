import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { viewReducer, networkReducer, configReducer } from './redux/reducers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  network: networkReducer,
  view: viewReducer,
  config: configReducer,
})

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
    </Provider>,
  document.getElementById('root')
);
