import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TextStyle, StyleProp } from 'react-native';

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = 'black', style }) => {
  return <MaterialIcons name={name as any} size={size} color={color} style={style} />;
};
