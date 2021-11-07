import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'

export const MyWardrobe = (props) => {

    const history = useHistory();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [product, setProduct] = useState([]);

    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (user) {
                setProduct([]);
                var docRef = db.collection("wardrobe").doc(user.uid);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        //setProduct(doc.data().products);
                        doc.data().products.map((p) => {
                            setProduct(product => [
                                {
                                    ProductID: p.ProductID,
                                    ProductImg: p.ProductImg,
                                    ProductName: p.ProductName,
                                    ProductPrice: p.ProductPrice * 0.95
                                }, ...product]);
                        })
                    } else {
                        console.log("No such document!");
                    }
                    console.log("Products:", product);
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
            else {
                console.log("User not true");
            }
        })
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
                {product.length !== 0 && <h1 className="heading">Wardrobe Products</h1>}
                <div className='products-container'>
                    {product.length === 0 && <div>slow internet...no products to display</div>}
                    {product.map(p => (
                        p.ProductID !== "" ?
                            (<div className='product-card' key={p.ProductID}>
                                <div className='product-img'>
                                    <img src={p.ProductImg} alt="not found" />
                                </div>
                                <div className='product-name'>
                                    {p.ProductName}
                                </div>
                                <div className='product-price'>
                                    Rs {p.ProductPrice}.00
                                </div>
                            </div>)
                            : null
                    ))}
                </div>
            </div>
        </>

    )

}
