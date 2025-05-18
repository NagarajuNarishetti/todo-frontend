import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo({ todos, editTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find todo by _id (not id)
  const todo = todos.find((t) => t._id === id);

  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  useEffect(() => {
    if (!todo) navigate("/");
  }, [todo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo._id, { title, description }); // use _id here
    navigate("/");
  };

  if (!todo) return null;

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
      <h2 style={{ marginBottom: 20, color: "#34495e" }}>Edit Todo</h2>

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
          backgroundColor: "#2980b9",
          color: "white",
          padding: 14,
          border: "none",
          borderRadius: 8,
          fontSize: 18,
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2471a3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
      >
        Save Changes
      </button>
    </form>
  );
}
