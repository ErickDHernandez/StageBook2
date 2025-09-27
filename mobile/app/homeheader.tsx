import React, { ReactNode } from 'react';
import { View, StyleSheet, Image, useColorScheme } from 'react-native';

interface HeaderLayoutProps {
  children: ReactNode;
  headerBackgroundColor?: { light: string; dark: string };
  headerImage?: ReactNode;
}

const HeaderLayout = ({
  children,
  headerBackgroundColor = { light: 'white', dark: 'black' },
  headerImage,
}: HeaderLayoutProps) => {
  const colorScheme = useColorScheme(); // Detecta modo claro/oscuro
  const backgroundColor =
    colorScheme === 'dark'
      ? headerBackgroundColor.dark
      : headerBackgroundColor.light;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {headerImage && <View style={styles.headerImage}>{headerImage}</View>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default HeaderLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 200, // ajusta según tu imagen
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
