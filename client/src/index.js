import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from "react-redux";
import {fetchTasks} from './features/tasks/taskSlice';

store.dispatch(fetchTasks())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

