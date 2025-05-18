import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", description: "Start React tutorial", done: false },
    { id: 2, title: "Build Todo App", description: "Create a CRUD todo app", done: false },
  ]);

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const addTodo = (title, description) => {
    const newTodo = {
      id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      description,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
