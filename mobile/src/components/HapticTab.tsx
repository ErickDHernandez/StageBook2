import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as Haptics from 'expo-haptics';

type NullableProps<T> = {
  [K in keyof T]: T[K] | null;
};

type HapticTabProps = NullableProps<TouchableOpacityProps>;

export const HapticTab: React.FC<HapticTabProps> = ({ children, onPress, ...props }) => {
  const handlePress = (event: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress && onPress(event);
  };

  const normalizedProps: TouchableOpacityProps = Object.fromEntries(
    Object.entries(props).map(([key, value]) => [key, value === null ? undefined : value])
  ) as TouchableOpacityProps;

  return (
    <TouchableOpacity {...normalizedProps} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};
