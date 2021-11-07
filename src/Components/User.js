import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from '../Config/Config'
import { Navbar } from './Navbar'

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



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
      {/* <h2 style={{ textAlign: 'center' }} className="heading">USERS</h2> */}
      <h1 className="heading" style={{ margin: '0 60px 12px 60px' }}>Users</h1>
      <div className="users-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Wardrobe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.id}</TableCell>

                  <TableCell align="right">
                    <Link to={`wardrobe/${user.id}`} className="navlink">
                      View Wardrobe
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}