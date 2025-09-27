import React from 'react';
import { type ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/use-color-scheme';

export function TabBarIcon({ style, ...rest }: ComponentProps<typeof Ionicons>) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <Ionicons
      size={28}
      style={[{ marginBottom: -3, color: iconColor }, style]}
      {...rest}
    />
  );
}