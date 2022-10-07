import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SearchHome from './components/SearchHome';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          component={ SearchHome }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
