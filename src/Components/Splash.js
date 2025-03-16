import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, useColorScheme } from 'react-native';
import { Color, FontSize } from '../Global';

const Splash = ({ onAnimationEnd }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;
  const systemTheme = useColorScheme();
  const isDark = systemTheme === "dark";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        onAnimationEnd();
      }, 500);
    });
  }, []);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [isDark ? "#121212" : "#f8f9fa", isDark ? "#1e1e1e" : "#fff"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            color: isDark ? "white" : "black", // Dynamic text color
          },
        ]}
      >
        Share ToDo
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSize.headline,
    fontWeight: 'bold',
  },
});

export default Splash;
