import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from '../Config/Config'
import { Navbar } from './Navbar'

export const User = (props) => {

  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        history.push('/login');
      }
    })

    // setUsers([]);
    let newUsers = [];
    var docRef = db.collection("SignedUpUsersData").get().then((snapshot) => {
      snapshot.docs.forEach(user => {
        newUsers.push({
          id: user.id,
          name: user.data().Name,
          email: user.data().Email
        })
      });
      setUsers(newUsers);
    })
  }, [])

  return (
    <>
      <Navbar user={props.user} />
      <div>
        {users.map(user => (
          <div key={user.id}>
            {user.name}
            {user.email}
            <a href={`wardrobe/${user.id}`}>Link{user.id}</a>
            {/* <Link to={`wardrobe/${user.id}`} /> */}
          </div>
        ))}
      </div>
    </>
  )
}