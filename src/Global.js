import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get device screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12 dimensions)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scale based on width and height
const scale = (size) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  const scaleFactor = Math.min(scaleWidth, scaleHeight); // Use the smallest scale to maintain proportions
  return size * scaleFactor;
};

// Normalize font size based on pixel density, scale, and platform
const normalizeFontSize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // Adjust slightly for Android (optional fine-tuning)
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};



export const responsiveWidth = (percentage) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Get responsive height
export const responsiveHeight = (percentage) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};



/* fonts */
export const FontFamily = {
  extralight: 'Roboto-ExtraLight',
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  semibold: 'Roboto-SemiBold',
  bold: 'Roboto-Bold', 
  extrabold: 'Roboto-ExtraBold', 
};
/* font sizes */
export const FontSize = {
  tiny: normalizeFontSize(10),
  small: normalizeFontSize(12),
  regular: normalizeFontSize(14),
  medium: normalizeFontSize(16),
  large: normalizeFontSize(18),
  extraLarge: normalizeFontSize(22),
  title: normalizeFontSize(28),
  headline: normalizeFontSize(32),
};
/* Colors */
export const Color = {
  main:'#F5C518',
  primary: '#F5C518',
  secondary: '#FFA500',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#D3D3D3',
  darkGray: '#A9A9A9',
  error:'#FF0000'
};



