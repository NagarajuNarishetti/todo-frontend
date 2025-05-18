import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title, description); // call addTodo from props (App.js)
    navigate("/"); // go back to home page after add
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "white",
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 20, color: "#34495e" }}>Add New Todo</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 16,
          boxSizing: "border-box",
        }}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 16,
          resize: "vertical",
          boxSizing: "border-box",
          marginBottom: 20,
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          backgroundColor: "#27ae60",
          color: "white",
          padding: 14,
          border: "none",
          borderRadius: 8,
          fontSize: 18,
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
      >
        Add Todo
      </button>
    </form>
  );
}
