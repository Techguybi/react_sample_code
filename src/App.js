import React from 'react';
import Home from '../src/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';
import { Provider } from 'react-redux';
import { store, persistor } from './components/redux';
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>

    </div>
  );
}

export default App;
