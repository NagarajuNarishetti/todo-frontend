import React from "react";
import { Link } from "react-router-dom";

export default function Home({ todos, toggleDone, deleteTodo }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: 18, color: "#777" }}>
          No todos yet. Add some!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 15,
                marginBottom: 15,
                backgroundColor: "white",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                borderRadius: 8,
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)"}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 15,
                  cursor: "pointer",
                  accentColor: "#28a745",
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong
                  style={{
                    fontSize: 18,
                    textDecoration: todo.done ? "line-through" : "none",
                    color: todo.done ? "#999" : "#333",
                  }}
                >
                  {todo.title}
                </strong>
                {todo.description && (
                  <div style={{ fontSize: 14, color: "#555", marginTop: 5 }}>
                    {todo.description}
                  </div>
                )}
              </div>

              <Link
                to={`/edit/${todo.id}`}
                style={{
                  marginRight: 15,
                  color: "#007bff",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: 16,
                }}
              >
                Edit
              </Link>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  border: "none",
                  color: "white",
                  padding: "8px 14px",
                  cursor: "pointer",
                  borderRadius: 5,
                  fontWeight: "600",
                  fontSize: 16,
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
