import { PureComponent } from 'react';
import './App.css';
import Header  from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import {CurrencyProvider} from './context/CurrencyContext';
import CartContext from './context/CartContext';

class App extends PureComponent {

  static contextType = CartContext;

  render() {

    const { closeCart, isOpen } = this.context;

    return (
      <div className="App">
        <Router>
          <CurrencyProvider>
            <Header />
            <div className={isOpen ? "gray-overlay" : "hidden"} onClick={closeCart}></div>
              <Switch>
                <Route path="/cart" component={CartPage} />
                <Route
                  exact
                  path="/"
                  render={(props) => <CategoryPage {...props} />}
                />
                <Route
                  exact
                  path="/:categoryName"
                  render={(props) => <CategoryPage {...props} />}
                />
                <Route exact path="/products/:productId" component={ProductPage} />
              </Switch>
          </CurrencyProvider>
        </Router>
      </div>
    );
  }
}

export default App;
