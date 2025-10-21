import React from 'react';

export const Textarea = ({ className = '', ...props }) => {
  return <textarea {...props} className={`w-full p-4 rounded-lg ${className}`} />;
};

export default Textarea;
