import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

// Custom hook to toggle between light and dark themes
function useToggleTheme() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return [theme, toggleTheme] as const; // Use tuple-like return
}

// Component for click counter
export function ClickCounter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    setCount(count + 1);
  };

  // Updating the document title with effect hook
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        padding: "20px",
        borderRadius: "10px", // Add some rounded corners for nicer styling
        transition: "background 0.3s, color 0.3s", // Smooth transition when theme changes
      }}
    >
      <p>You clicked {count} times</p>
      <button
        onClick={handleClick}
        style={{
          background: theme.text,
          color: theme.background,
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.3s, color 0.3s", // Smooth transition
        }}
        aria-label="Increment Counter" // Accessible button label
      >
        Click me
      </button>
    </div>
  );
}

// Wrapper component to provide context
function ToggleTheme() {
  const [theme, toggleTheme] = useToggleTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: theme.text,
            color: theme.background,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            marginBottom: "20px",
            transition: "background 0.3s, color 0.3s", // Smooth transition
          }}
          aria-label="Toggle Theme" // Accessible button label
        >
          Toggle Theme
        </button>
        <ClickCounter />
      </div>
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;
