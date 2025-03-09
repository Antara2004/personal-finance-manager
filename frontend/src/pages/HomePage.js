import React from 'react';

function HomePage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to the your Personal Finance Manager</h1>
        <p style={styles.subtitle}>
          This will help you track your Expenses and manage them accordingly!!.
        </p>
        <p style={styles.text}>
          Navigate to the <strong>Expenses</strong> page to view and manage your expenses, 
          or head over to <strong>Login</strong> to access your account. 
          We hope you enjoy using this application!
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right,rgb(226, 244, 171), #c3cfe2)', // soft gradient background
    padding: '40px'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    color: '#333'
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#666'
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555'
  }
};

export default HomePage;
