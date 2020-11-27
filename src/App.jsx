import React, { Component } from "react";
import Store from './components/store'
import CartProvider from './components/cart/context'
import Cart from './components/cart'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <CartProvider>
                        <Route exact path="/" component={Store} />
                        <Route path="/cart" component={Cart} />
                    </CartProvider>
                </Switch>
            </Router>
        )
    }
}
export default App;
