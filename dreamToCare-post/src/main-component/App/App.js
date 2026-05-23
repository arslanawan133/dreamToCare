import React, { useEffect } from 'react';
import AllRoute from '../router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import './App.css';
import { store } from '../../config/store';
import OneSignal from 'react-onesignal';

const App = () => {
  useEffect(() => {
    OneSignal.init({
      appId: "b0d393b2-4b28-4f63-b073-860410951463",
      notifyButton: {
        enable: true,
      },
      persistNotification: true,
      allowLocalhostAsSecureOrigin: true,
    });
  }, []);
  return (
    <div className='App' id='scrool'>
      <Provider store={store}>
        <AllRoute />
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
