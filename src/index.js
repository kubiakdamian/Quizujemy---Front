import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";

const AppWithStore = (
    <div>
      <Provider store={store}>
        <App store={store} />
      </Provider>
      <ToastContainer />
    </div>
  );

ReactDOM.render(AppWithStore, document.getElementById('root'));
registerServiceWorker();
