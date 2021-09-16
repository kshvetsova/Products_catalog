import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ProductsProvider } from './ProductsProvider';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { WatchesPage } from './components/WatchesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { FavoritesPage } from './components/FavoritesPage';
import { CartPage } from './components/CartPage';
import { Footer } from './components/Footer';
import { Scroll } from './components/Scroll';
import './App.scss';

const App = () => (
  <div className="App">
    <ProductsProvider>
      <Header />
      <div className="App-Main">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/phones">
            <Switch>
              <Route
                path="/:typeProduct?/product/:productId?"
                component={ProductDetailsPage} />
              <PhonesPage />
            </Switch>
          </Route>
          <Route path="/tablets">
            <Switch>
              <Route
                path="/:typeProduct?/product/:productId?"
                component={ProductDetailsPage}
              />
              <TabletsPage />
            </Switch>
          </Route>
          <Route path="/watches">
            <Switch>
              <Route
                path="/:typeProduct?/product/:productId?"
                component={ProductDetailsPage}
              />
              <WatchesPage />
            </Switch>
          </Route>
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/cart" component={CartPage} />
          <Redirect path="/" to="/home" exact/>
        </Switch>
      </div>
    </ProductsProvider>
    <Scroll />
    <Footer />
  </div>
)

export default App;
