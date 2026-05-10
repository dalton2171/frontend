import { useState } from "react";

export const useSystemStore = () => {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  return {
    theme,
    setTheme,
    user,
    setUser,
  };
};