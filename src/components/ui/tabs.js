import React, { createContext, useContext } from 'react';

const TabsContext = createContext(null);

export const Tabs = ({ children, value, onValueChange }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const TabsTrigger = ({ children, value, className = '' }) => {
  const ctx = useContext(TabsContext);
  const isActive = ctx && ctx.value === value;

  return (
    <button
      onClick={() => ctx && ctx.onValueChange && ctx.onValueChange(value)}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      className={className}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
};

export default Tabs;
