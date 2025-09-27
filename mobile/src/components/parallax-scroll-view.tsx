import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
  headerBackgroundColor?: { light: string; dark: string };
  headerImage?: React.ReactNode;
}

const ParallaxScrollView = ({
  children,
  headerBackgroundColor,
  headerImage,
}: ParallaxScrollViewProps) => {
  return (
    <ScrollView style={styles.container}>
      {headerImage && <View style={styles.header}>{headerImage}</View>}
      {children}
    </ScrollView>
  );
};

export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200, // ajusta según tu imagen
  },
});
