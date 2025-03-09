import React, { useState, useEffect } from 'react';

function ExpenseDashboard() {
  // Initialize expenses state as an empty array
  const [expenses, setExpenses] = useState([]);

  // State for the form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState('');

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        console.log("Fetched expenses:", data);
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  // Handle form submission to add a new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount) || 0;

    const expenseData = {
      description,
      amount: numericAmount,
      category,
      paymentMethod,
      date
    };

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
      const newExpense = await response.json();
      // Append new expense to state
      setExpenses([...expenses, newExpense]);

      // Reset form fields
      setDescription('');
      setAmount('');
      setCategory('');
      setPaymentMethod('');
      setDate('');
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Handle deletion of an expense (if your backend supports DELETE)
  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Calculate total monthly expenses
  const totalMonthly = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome! Here Are Your Finances:</h1>

        {/* Expense Form */}
        <form onSubmit={handleAddExpense} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method:</label>
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.addButton}>
            Add Expense
          </button>
        </form>

        {/* Expense Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Payment Method</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp._id}>
                <td style={styles.td}>{exp.description}</td>
                <td style={styles.td}>{exp.amount}</td>
                <td style={styles.td}>{exp.category}</td>
                <td style={styles.td}>{exp.paymentMethod}</td>
                <td style={styles.td}>{new Date(exp.date).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDeleteExpense(exp._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={styles.total}>Total Monthly: ${totalMonthly}</h3>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right,rgb(199, 230, 169),rgb(169, 76, 157))',
    padding: '40px'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px'
  },
  formGroup: {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
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
    height: '40px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    tableLayout: 'fixed' // ensures columns have fixed widths
  },
  th: {
    textAlign: 'left',
    padding: '12px 8px',
    borderBottom: '2px solid #ddd',
    color: '#333',
    width: '16.6%' // roughly divides the table evenly
  },
  td: {
    padding: '10px 8px',
    borderBottom: '1px solid #ddd',
    wordWrap: 'break-word' // helps wrap long text
  },
  deleteButton: {
    backgroundColor: '#cc0000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  total: {
    textAlign: 'right',
    marginTop: '10px',
    fontWeight: 'bold'
  }
};

export default ExpenseDashboard;
