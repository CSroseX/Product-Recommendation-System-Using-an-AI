import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button {...props} className={`inline-flex items-center justify-center gap-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
