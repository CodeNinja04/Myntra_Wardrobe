import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext'
import { Navbar } from './Navbar';
import { useHistory, useParams } from 'react-router-dom'

export const Wardrobe = (props) => {

  const history = useHistory();

  const { dispatch } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  let { id } = useParams();

  // defining state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [prod, setProd] = useState([{
    ProductID: "",
    ProductImg: "",
    ProductName: "",
    ProductPrice: 0
  }]);


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        history.push('/login');
      }
    })

    var docRef = db.collection("wardrobe").doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //setProduct(doc.data().products);
        doc.data().products.map((p) => {
          // console.log(p);
          setProd(product => [
            {
              ProductID: p.ProductID,
              ProductImg: p.ProductImg,
              ProductName: p.ProductName,
              ProductPrice: p.ProductPrice * 0.95
            }, ...product]);
        })
      } else {
        // console.log("No such document!");
      }

      console.log("Products:", prod);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])


  return (
    <>
      <Navbar user={props.user} />
      <div>
        {/* {product.map((friend) => (
                // I am no longer using index as key, as I have unique id value.
                <li key={friend.id}>
                    <span>name: {friend.ProductID}</span>{" "}
                    <span>age: {friend.ProductImg}</span>
                    <br />
                    
                </li>
            ))} */}
            
        {prod.length !== 0 && <h1>Wardrobe Products</h1>}
        <div className='products-container'>
          {prod.length === 0 && <div>slow internet...no products to display</div>}
          {prod.map(product => (
            product.ProductID !== "" ?
              (<div className='product-card' key={product.ProductID}>
                <div className='product-img'>
                  <img src={product.ProductImg} alt="not found" />
                </div>
                <div className='product-name'>
                  {product.ProductName}
                </div>
                <div className='product-price'>
                  Rs {product.ProductPrice}.00
                </div>
                <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
              </div>)
              : null
          ))}
        </div>
      </div>
    </>

  )

}
