import { useColorScheme as RNColorScheme } from 'react-native';

export const useColorScheme = () => {
  const scheme = RNColorScheme();
  return scheme; // 'light' | 'dark' | null
};
