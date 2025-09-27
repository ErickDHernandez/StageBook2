import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'default' | 'defaultSemiBold'|"link";
  children: React.ReactNode;
}

export const ThemedText = ({ type = 'default', style, children, ...props }: ThemedTextProps) => {
  let textStyle = styles.default;

  switch (type) {
    case 'title':
      textStyle = styles.title;
      break;
    case 'subtitle':
      textStyle = styles.subtitle;
      break;
    case 'defaultSemiBold':
      textStyle = styles.defaultSemiBold;
      break;
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: 'black',
    fontSize: 14,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  defaultSemiBold: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  link: {
    color:"blue",
    textDecorationLine:"underline",
  }
});
