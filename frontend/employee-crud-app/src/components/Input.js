import React from "react";

const Input = ({ name, type, value, handleChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
