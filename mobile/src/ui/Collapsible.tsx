import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';


interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <ThemedText type="subtitle">{title}</ThemedText>
      </TouchableOpacity>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    marginTop: 4,
    paddingLeft: 8,
  },
});
