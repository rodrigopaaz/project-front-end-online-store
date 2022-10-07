import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SearchHome from './components/SearchHome';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={ SearchHome }
        />
        <Route
          path="/shoppingcart"
          component={ ShoppingCart }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
