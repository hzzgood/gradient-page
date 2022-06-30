import React, { useRef, useEffect, useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
  Easing,
  Dimensions,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const START_POINT = { x: 0, y: 0 };
const END_POINT = { x: 0, y: 1 };

interface Props {
  colors: string[]
}

const AnimatedLinearGradient = ({ colors }: Props) => {

  const { width, height } = useWindowDimensions();
  const [colorTop, setColorTop] = useState(new Animated.Value(0));
  const [colorMiddle, setColorMiddle] = useState(new Animated.Value(0));
  const [colorBottom, setColorBottom] = useState(new Animated.Value(0));

  // Set Animation
  const startAnimation = () => {
    setColorTop(new Animated.Value(0));
    setColorMiddle(new Animated.Value(0));
    setColorBottom(new Animated.Value(0));
    Animated.parallel(
      [colorTop, colorMiddle, colorBottom].map(animatedColor => {
        return Animated.timing(animatedColor, {
          toValue: colors.length,
          duration: colors.length * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      })
    )
    .start(startAnimation);
  };

  useEffect(() => {
    startAnimation();
  });

  // Get interpolated colors
  const getInterpolatedColors = () => {
    const renderColors: Array<string[]> = [];
    while (renderColors.length < 3) {
      renderColors.push(
        colors
        .slice(renderColors.length)
        .concat(colors.slice(0, renderColors.length + 1))
      )
    }
    const interpolatedColors = [colorTop, colorMiddle, colorBottom].map((animatedColor, index) => {
      return animatedColor.interpolate({
        inputRange: Array.from({ length: colors.length + 1 }, (v, k) => k),
        outputRange: renderColors[index]
      })
    });
    return interpolatedColors;
  }

  // To do: Transform interpolated colors to color strings
  const getAnimatedColors = () => {

  }

  return (
    <Animated.View>
      <LinearGradient 
        style={{
          ...styles.container,
          width,
          height
        }}
        // Should load animated colors instead
        colors={colors}
        start={START_POINT}
        end={END_POINT}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AnimatedLinearGradient;
