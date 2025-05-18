import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      done: false,
    };
    const updated = [...todos, newTodo];
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const editTodo = (id, updatedData) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedData } : todo
    );
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const toggleDone = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 30, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={<Home todos={todos} toggleDone={toggleDone} deleteTodo={deleteTodo} />}
        />
        <Route path="/add" element={<AddTodo addTodo={addTodo} />} />
        <Route
          path="/edit/:id"
          element={<EditTodo todos={todos} editTodo={editTodo} />}
        />
      </Routes>
    </div>
  );
}

export default App;
