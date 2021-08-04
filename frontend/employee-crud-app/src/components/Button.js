import React from "react";

const Button = ({ type, onClick, onSubmit, label, className, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={className}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
