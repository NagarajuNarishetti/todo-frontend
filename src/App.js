import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend on component mount
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(console.error);
  }, []);

  const addTodo = async (title, description) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, done: false }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  const editTodo = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !todo.done }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={<Home todos={todos} toggleDone={toggleDone} deleteTodo={deleteTodo} />}
        />
        <Route path="/add" element={<AddTodo addTodo={addTodo} />} />
        <Route path="/edit/:id" element={<EditTodo todos={todos} editTodo={editTodo} />} />
      </Routes>
    </div>
  );
}

export default App;
