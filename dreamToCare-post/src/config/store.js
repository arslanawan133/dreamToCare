import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const componseEnhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['auth', 'posts'],
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, componseEnhancer(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { persistor, store };
