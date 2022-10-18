import React, { ref } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav__link = [
  { path: 'home', display: 'Home' },
  { path: 'shop', display: 'Shop' },
  { path: 'cart', display: 'Cart' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalQuantityFavorite = useSelector((state) => state.cart.totalQuantityFavorite);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu');
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  });

  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToFavorite = () => {
    navigate('/favorite');
  };

  /** sau khi đẫ lưu thông tin đăng nhập lên firebase */

  const currentUser = useAuth();

  const profileActionRef = useRef(null);

  const toggleProfileAction = () => profileActionRef.current.classList.toggle('show__profileAction');

  // logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('logged out');
        navigate('/home');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper ">
            <Link to="/home" className="logo">
              <img src={logo} alt="logo" />
              <div className="">
                <h1>D-mart</h1>
                {/* <p>since 1997 - by DKU</p> */}
              </div>
            </Link>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={(navClass) => (navClass.isActive ? 'nav__active' : '')}>
                      {/* first*/}
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon" onClick={navigateToFavorite}>
                <i class="ri-heart-line"></i>
                <span className="badge">{totalQuantityFavorite}</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-3-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.div className="profile_info" whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }} onClick={toggleProfileAction}>
                  <img src={currentUser ? currentUser.photoURL : userIcon} alt={currentUser ? currentUser.displayName : 'user'} />
                  <span>{currentUser ? currentUser.displayName : 'user'}</span>
                </motion.div>
                <div className="profile__action" ref={profileActionRef}>
                  {currentUser ? (
                    <a onClick={logout}>Logout</a>
                  ) : (
                    <div>
                      <Link to="/signup">Sign up</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
