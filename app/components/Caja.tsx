import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

interface CajaProps {
  label: string;
  icono: React.ReactNode;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
}

const Caja = ({ label, icono, onChangeText, keyboardType = 'default' }: CajaProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icono}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default Caja;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A67B5B',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});
