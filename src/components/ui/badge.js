import React from 'react';

export const Badge = ({ children, className = '', variant, ...props }) => (
  <span {...props} className={`inline-block text-xs px-2 py-1 rounded ${className}`}>
    {children}
  </span>
);

export default Badge;
