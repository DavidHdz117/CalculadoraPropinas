import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Boton from '../components/Boton';
import Caja from '../components/Caja';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface HistorialItem {
  id: string;
  consumo: string;
  porcentaje: number;
  propina: number;
  total: number;
}

const CalculadoraPropinas = () => {
  const [consumo, setConsumo] = useState('');
  const [propina, setPropina] = useState<number | null>(null);
  const [otroPorcentaje, setOtroPorcentaje] = useState('');
  const [total, setTotal] = useState<number | null>(null);
  const [ultimoPorcentaje, setUltimoPorcentaje] = useState<number | null>(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [historial, setHistorial] = useState<HistorialItem[]>([]);

  const calcularPropina = (porcentaje: number) => {
    const valorConsumo = parseFloat(consumo);
    if (isNaN(valorConsumo) || valorConsumo <= 0) {
      Alert.alert('Error', 'Por favor ingresa un valor numérico válido para el consumo.');
      return;
    }

    if (isNaN(porcentaje) || porcentaje <= 0) {
      Alert.alert('Error', 'Por favor ingresa un valor numérico válido para el porcentaje.');
      return;
    }

    const propinaCalculada = valorConsumo * (porcentaje / 100);
    const totalCalculado = valorConsumo + propinaCalculada;
    setPropina(propinaCalculada);
    setTotal(totalCalculado);
    setUltimoPorcentaje(porcentaje);
    setMostrarResultados(true);
    agregarAlHistorial(valorConsumo, porcentaje, propinaCalculada, totalCalculado);
  };

  const calcularUltimoPorcentaje = () => {
    if (ultimoPorcentaje !== null) {
      calcularPropina(ultimoPorcentaje);
    }
  };

  const limpiarResultados = () => {
    setPropina(null);
    setTotal(null);
    setMostrarResultados(false);
  };

  const agregarAlHistorial = (consumo: number, porcentaje: number, propina: number, total: number) => {
    const nuevoItem: HistorialItem = {
      id: Date.now().toString(),
      consumo: consumo.toFixed(2),
      porcentaje,
      propina,
      total,
    };
    setHistorial([nuevoItem, ...historial]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Caja
        label='Consumo'
        icono={<FontAwesome name="dollar" size={24} color="black" />}
        onChangeText={(text) => {
          if (/^\d*\.?\d*$/.test(text)) {
            setConsumo(text);
            limpiarResultados();
          } else {
            Alert.alert('Entrada inválida', 'Solo se permiten valores numéricos.');
          }
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Propina</Text>
      <View style={styles.botonesPropina}>
        <Boton titulo="10%" onPress={() => calcularPropina(10)} />
        <Boton titulo="15%" onPress={() => calcularPropina(15)} />
        <Boton titulo="20%" onPress={() => calcularPropina(20)} />
      </View>

      <Caja
        label='Otro porcentaje'
        icono={<Feather name="percent" size={24} color="black" />}
        onChangeText={(text) => {
          if (/^\d*\.?\d*$/.test(text)) {
            setOtroPorcentaje(text);
            limpiarResultados();
          } else {
            Alert.alert('Entrada inválida', 'Solo se permiten valores numéricos.');
          }
        }}
        keyboardType="numeric"
      />

      <Boton titulo='Calcular' onPress={() => {
        const valorOtro = parseFloat(otroPorcentaje);
        if (!isNaN(valorOtro) && valorOtro > 0) {
          calcularPropina(valorOtro);
        } else {
          Alert.alert('Error', 'Por favor ingresa un valor numérico válido para el porcentaje.');
        }
      }} />

      {mostrarResultados && total !== null && (
        <View style={styles.resultado}>
          <Text>Consumo: <FontAwesome name="dollar" size={16} /> {consumo}</Text>
          <Text>Propina: <FontAwesome name="dollar" size={16} /> {propina?.toFixed(2)}</Text>
          <Text>Total: <FontAwesome name="dollar" size={16} /> {total?.toFixed(2)}</Text>
        </View>
      )}

      <Text style={styles.historialTitulo}>Historial</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historialItem}>
            <Text>Consumo: ${item.consumo}</Text>
            <Text>Propina ({item.porcentaje}%): ${item.propina.toFixed(2)}</Text>
            <Text>Total: ${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default CalculadoraPropinas;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE0D4',
  },
  botonesPropina: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
  },
  historialTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historialItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});
