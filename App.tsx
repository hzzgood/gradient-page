import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import AnimatedLinearGradient from './components/AnimatedLinearGradient';

const COLOR1 = '#00BF6F';
const COLOR2 = '#FDDA25';
const COLOR3 = '#71DBD4';

const COLORS = [COLOR1, COLOR2, COLOR3];

export default function App() {

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient colors={COLORS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
