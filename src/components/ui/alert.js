import React from 'react';

export const Alert = ({ children, className = '' }) => (
  <div className={`p-3 rounded-lg flex items-center gap-2 ${className}`}>{children}</div>
);

export const AlertDescription = ({ children }) => (
  <div className="text-sm text-gray-700">{children}</div>
);

export default Alert;
