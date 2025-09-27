import React from 'react';
import { View, ViewProps } from 'react-native';

export const ThemedView = (props: ViewProps) => (
  <View {...props} style={[props.style, { backgroundColor: 'white' }]} />
);
