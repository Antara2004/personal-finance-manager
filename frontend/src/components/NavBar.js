import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Expense Manager</h1>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/expenses" style={styles.link}>Expenses</Link>
        </li>
        <li>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    // A vibrant gradient background
    background: 'linear-gradient(to right,rgb(9, 57, 72),rgb(60, 136, 174))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    height: '60px'
  },
  title: {
    fontSize: '1.8rem',
    margin: 0,
    color: '#fff'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold'
  }
};

export default NavBar;
