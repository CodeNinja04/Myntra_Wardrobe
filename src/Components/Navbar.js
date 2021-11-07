import React, { useContext } from 'react'
import '../styles/Navbar.css';
import logo from '../images/myntra.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from '@mui/icons-material/Logout';



export const Navbar = ({ user }) => {

  const history = useHistory();
  const { totalQty } = useContext(CartContext);

  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push('/login');
    })
  }

  return (
    <div className="nav-main">
      <div className="navbox">
        <div className="leftside">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />{" "}
          </Link>
        </div>
        {/* <Link to="/transactions">PREV TRASANCTIONS</Link> */}
        {!user && (
          <div className="rightside">
            <span className="nav-tab">
              <Link to="/signup" className="navlink">
                SIGN UP
              </Link>
            </span>
            <span className="nav-tab">
              <Link to="/login" className="navlink">
                LOGIN
              </Link>
            </span>
          </div>
        )}
        {user && (
          <div className="rightside">
            <span className="nav-tab">
              <Link to="/" className="navlink">
                {user}
              </Link>
            </span>
            <span className="nav-tab cart-quantity">
              <Link to="/cartproducts" className="navlink">
                <Icon icon={cart} />
                <span className="no-of-products">{totalQty}</span>
              </Link>
            </span>
            <span className="nav-tab">
              <Link to="/mywardrobe" className="navlink">
                My Wardrobe
              </Link>
            </span>
            <span className="nav-tab">
              <Link to="/wardrobe" className="navlink">
                Wardrobe
              </Link>
            </span>
            <span className="nav-tab">
              <Link to="/transactions" className="navlink">
                Transactions
              </Link>
            </span>
            <span className="">
              <button className="logout-btn" onClick={handleLogout}>
                <LogoutIcon /> Logout
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
