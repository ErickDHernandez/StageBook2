import React from 'react';
import { TouchableOpacity, Linking, StyleSheet } from 'react-native';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  const handlePress = () => {
    Linking.openURL(href).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.link}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    paddingVertical: 4,
  },
});
