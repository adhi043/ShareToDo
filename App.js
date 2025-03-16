import "react-native-gesture-handler";
import { View, LogBox, StatusBar, useColorScheme } from "react-native";
import React from "react";
import StackNavigator from "./src/Navigation/StackNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import { Color } from "./src/Global";

const App = () => {
  LogBox.ignoreAllLogs();

  const systemTheme = useColorScheme(); // Detect system theme
  const isDark = systemTheme === "dark";

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? Color.black : Color.white} 
      />

      <ThemeProvider>
        <StackNavigator />
      </ThemeProvider>
    </>
  );
};

export default App;
