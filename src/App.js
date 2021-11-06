import React, { Component } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import { NotFound } from './Components/NotFound'
import { auth, db } from './Config/Config'
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './Components/Cart'
import { AddProducts } from './Components/AddProducts'
import { Cashout } from './Components/Cashout'
import { MyWardrobe } from './Components/MyWardrobe'
import { Transactions } from './Components/Transactions'
import { TransactionsContextProvider } from './Global/TransactionsContext'
import { User } from './Components/User'
import { Wardrobe } from './Components/Wardrobe'


export class App extends Component {

    state = {
        user: null,
        uid: null
    }

    componentDidMount() {

        // getting user info for navigation bar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        user: snapshot.data().Name,
                        uid: user.uid
                    })
                })
            }
            else {
                this.setState({
                    user: null,
                    uid: null
                })
            }
        })

    }

    render() {
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <TransactionsContextProvider>
                        <BrowserRouter>
                            <Switch>
                                {/* home */}
                                <Route exact path='/' component={() => <Home user={this.state.user} />} />
                                {/* signup */}
                                <Route path="/signup" component={Signup} />
                                {/* login */}
                                <Route path="/login" component={Login} />
                                {/* cart products */}
                                <Route path="/cartproducts" component={() => <Cart user={this.state.user} />} />
                                {/* add products */}
                                <Route path="/addproducts" component={AddProducts} />
                                {/* cashout */}
                                <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                                <Route path="/mywardrobe" component={() => <MyWardrobe user={this.state.user} />} />
                                <Route path='/transactions' component={() => <Transactions user={this.state.user} />} />
                                <Route exact path='/wardrobe' component={() => <User user={this.state.user} />} />
                                <Route exact path={`/wardrobe/:id`} component={() => <Wardrobe user={this.state.user} />} />
                                <Route component={NotFound} />
                            </Switch>
                        </BrowserRouter>
                    </TransactionsContextProvider>
                </CartContextProvider>
            </ProductsContextProvider>
        )
    }
}

export default App
