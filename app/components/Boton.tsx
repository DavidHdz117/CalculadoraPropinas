import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

interface BotonProps {
  titulo: string;
  onPress: () => void;
}

const Boton = ({ titulo, onPress }: BotonProps) => {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
};

export default Boton;

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#4B2E1E',
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
