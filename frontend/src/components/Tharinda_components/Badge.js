// src/components/Badge.jsx
import React from "react";

const Badge = ({ color, children }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
      color === "blue"
        ? "bg-blue-100 text-blue-800"
        : color === "green"
        ? "bg-green-100 text-green-800"
        : "bg-purple-100 text-purple-800"
    }`}
  >
    {children}
  </span>
);

export default Badge;
