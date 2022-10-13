import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SearchHome from './components/SearchHome';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

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
        <Route
          path="/details/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route
          path="/checkout"
          component={ Checkout }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
