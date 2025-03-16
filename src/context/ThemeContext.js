import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, Animated, Easing } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || "light");
  const opacityAnim = new Animated.Value(0); // Animation value

  useEffect(() => {
    setTheme(systemTheme);

    // Animate the theme change with fade-in effect
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => opacityAnim.setValue(0));
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, opacityAnim }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
