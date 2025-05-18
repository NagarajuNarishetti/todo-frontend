import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

const API_URL = "https://todo-backend-1yey.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend on mount
  useEffect(() => {
    axios.get(`${API_URL}/todos`)
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Toggle done status and update backend
  const toggleDone = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    axios.put(`${API_URL}/todos/${id}`, { ...todo, done: !todo.done })
      .then(res => {
        setTodos(todos.map(t => t.id === id ? res.data : t));
      })
      .catch(err => console.error("Error toggling todo:", err));
  };

  // Add new todo via backend
  const addTodo = (title, description) => {
    axios.post(`${API_URL}/todos`, { title, description, done: false })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error("Error adding todo:", err));
  };

  // Edit todo via backend
  const editTodo = (id, updatedTodo) => {
    axios.put(`${API_URL}/todos/${id}`, updatedTodo)
      .then(res => {
        setTodos(todos.map(t => t.id === id ? res.data : t));
      })
      .catch(err => console.error("Error editing todo:", err));
  };

  // Delete todo via backend
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
      })
      .catch(err => console.error("Error deleting todo:", err));
  };

  return (
    <Router>
      <div style={{
        maxWidth: 700,
        margin: "30px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        borderRadius: 10,
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center", color: "#334e68", marginBottom: 30 }}>🌟 Todo App</h1>

        <nav style={{ marginBottom: 30, textAlign: "center" }}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/add" style={navLinkStyle}>Add Todo</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <Home
              todos={todos}
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
            />
          } />

          <Route path="/add" element={
            <AddTodo addTodo={addTodo} />
          } />

          <Route path="/edit/:id" element={
            <EditTodo todos={todos} editTodo={editTodo} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

const navLinkStyle = {
  marginRight: 20,
  textDecoration: "none",
  color: "#2c3e50",
  fontWeight: "600",
  fontSize: 18,
  padding: "8px 15px",
  borderRadius: 5,
  transition: "background-color 0.3s ease",
  cursor: "pointer",
};

export default App;
