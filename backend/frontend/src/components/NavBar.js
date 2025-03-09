// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/expenses" style={styles.link}>Expenses</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#333',
    padding: '10px'
  },
  link: {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none'
  }
};

export default NavBar;
