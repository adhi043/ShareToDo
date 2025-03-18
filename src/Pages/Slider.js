import React, { use, useCallback, useState } from 'react';
import { StyleSheet, View, Text, Image, useColorScheme, Animated } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Splash from '../Components/Splash';
import { Color, FontSize, responsiveHeight, responsiveWidth } from '../Global';

const slides = [
  {
    key: 'one',
    title: 'Welcome to Your Smart Planner',
    title1: 'Stay Organized & Productive',
    text: 'Manage your tasks effortlessly and stay on top of your goals every day.',
    image: require('../Assets/slider1.jpg'),
  },
  {
    key: 'two',
    title: 'Categorize & Prioritize',
    title1: 'Work, Personal & More',
    text: 'Sort tasks into categories to keep your work, personal, and daily activities in sync.',
    image: require('../Assets/slider2.jpg'),
  },
  {
    key: 'three',
    title: 'Mark Tasks as Done',
    title1: 'After Completion, Check your Task!', 
    text: 'Stay on top of your tasks by marking them as completed. Feel the progress!',
    image: require('../Assets/slider3.jpg'),
  },
];






const Slider = ({ navigation }) => {
  const [showSplash, setShowSplash] = useState(true);
  const systemTheme = useColorScheme();
  const isDark = systemTheme === "dark";
  const fadeAnim = useState(new Animated.Value(0))[0];

  if (showSplash) {
    return <Splash onAnimationEnd={() => setShowSplash(false)} />;
  }

 

  const renderItem = ({ item }) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={[styles.slide, { backgroundColor: isDark ? '#121212' : '#ffffff', opacity: fadeAnim }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000', fontSize:16, fontWeight:'500' }]}>{item.title1}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.text, { color: isDark ? '#ddd' : '#000' }]}>{item.text}</Text>
      </Animated.View>
    );
  };

  const onDone = () => navigation.navigate('Home');

  const renderButton = (label) => (
    <View style={[styles.button, { backgroundColor: isDark ? '#fff' : '#000' }]}>
      <Text style={[styles.buttonText, { color: isDark ? '#121212' : '#fff' }]}>{label}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onDone}
      renderNextButton={() => renderButton("Next")}
      renderDoneButton={() => renderButton("Done")}
      renderSkipButton={() => renderButton("Skip")}
      activeDotStyle={[styles.activeDot, { backgroundColor: isDark ? '#fff' : '#000' }]}
      dotStyle={[styles.dot, { backgroundColor: isDark ? '#555' : 'rgba(0, 0, 0, 0.2)' }]}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  title: {
    fontSize: FontSize.headline,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(45),
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default Slider;
