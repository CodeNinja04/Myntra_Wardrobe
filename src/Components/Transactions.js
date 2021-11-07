import React, { useContext, useEffect } from "react";
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'
import { TransactionsContext } from '../Global/TransactionsContext'
import { auth } from '../Config/Config'

import '../styles/Transactions.css';

export const Transactions = (props) => {

  const { transactions } = useContext(TransactionsContext);

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        history.push('/login');
      }
    })
  })

  return (
    <>
      <Navbar user={props.user} />
      <h1 className="heading" style={{ margin: '0 60px 12px 60px' }}>My Transactions</h1>
      <div className="transactions">
        {transactions &&
          transactions.map(tx => (
            <div className="transactions-card" key={tx.id}>
              <div className="transactions-card-header">
                <div className="transactions-buyer-info">
                  <h5>{tx.data().BuyerName}</h5>
                  <div>{tx.data().BuyerAddress}</div>
                  <div>{tx.data().BuyerCell}</div>
                  <div>{tx.data().BuyerEmail}</div>
                </div>
                <div className="transactions-cart-info">
                  {tx.data().BuyerQuantity} Products for <strong>${tx.data().BuyerPayment}</strong>
                </div>
              </div>
              <div className="transactions-card-body">
                {tx.data().products &&
                  tx.data().products.map(prod => (
                    <div className="transactions-product" key={prod.ProductID}>
                      <img src={prod.ProductImg} className="transactions-product-img" />
                      <div className="transactions-product-body">
                        <h5>{prod.ProductName}</h5>
                        <div>Each for ${prod.ProductPrice}</div>
                        <div>Quantity: {prod.qty}</div>
                      </div>
                      <div className="transactions-product-price">
                        ${prod.ProductPrice}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}