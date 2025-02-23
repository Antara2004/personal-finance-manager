import React, { useState } from 'react';

function ExpenseDashboard() {
  // Sample initial data (optional)
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Haircut',
      amount: 50,
      category: 'Entertainment',
      paymentMethod: 'Credit Card',
      date: '2025-02-23',
    },
    {
      id: 2,
      description: 'Electricity Bill',
      amount: 200,
      category: 'Utilities',
      paymentMethod: 'Bank Transfer',
      date: '2025-02-22',
    },
  ]);

  // State for the form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState('');

  // Handle form submission
  const handleAddExpense = (e) => {
    e.preventDefault();

    // Convert amount to a number, or default to 0 if invalid
    const numericAmount = parseFloat(amount) || 0;

    const newExpense = {
      id: Date.now(), // simple unique ID
      description,
      amount: numericAmount,
      category,
      paymentMethod,
      date,
    };

    // Update state
    setExpenses([...expenses, newExpense]);

    // Reset form fields
    setDescription('');
    setAmount('');
    setCategory('');
    setPaymentMethod('');
    setDate('');
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
  };

  // Calculate total monthly (simply sums all amounts in this demo)
  const totalMonthly = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="expense-dashboard" style={styles.container}>
      <h1 style={styles.heading}>Welcome! Here Are Your Finances:</h1>

      {/* FORM */}
      <form onSubmit={handleAddExpense} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.addButton}>
          Add Record
        </button>
      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.description}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.paymentMethod}</td>
              <td>{exp.date}</td>
              <td>
                <button
                  onClick={() => handleDeleteExpense(exp.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <h3 style={styles.total}>Total Monthly: ${totalMonthly}</h3>
    </div>
  );
}

// Inline styles (quick demo; you can use CSS files or a library instead)
const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '800px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
    backgroundColor: '#f7f7f7',
    padding: '15px',
    borderRadius: '8px',
  },
  formGroup: {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  addButton: {
    alignSelf: 'flex-end',
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: 'auto',
    height: '40px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  deleteButton: {
    backgroundColor: '#cc0000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
  },
};

export default ExpenseDashboard;
