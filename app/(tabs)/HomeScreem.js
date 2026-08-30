import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
} from 'react-native';

// Datos de prueba
const contactosFicticios = [
    { id: '100100', nombre: 'Carlos Gómez', telefono: '3001234567', ciudad: 'Medellín' },
    { id: '200200', nombre: 'Ana Martínez', telefono: '3119876543', ciudad: 'Bogotá' },
    { id: '300300', nombre: 'Luis Rodríguez', telefono: '3205554433', ciudad: 'Cali' },
    { id: '400400', nombre: 'María López', telefono: '3102223344', ciudad: 'Barranquilla' },
    { id: '500500', nombre: 'Jorge Pérez', telefono: '3156667788', ciudad: 'Cartagena' },
    { id: '600600', nombre: 'Sofía Ramírez', telefono: '3124445566', ciudad: 'Bucaramanga' },
    { id: '700700', nombre: 'Andrés Torres', telefono: '3137778899', ciudad: 'Pereira' },
    { id: '800800', nombre: 'Valentina Castro', telefono: '3148889900', ciudad: 'Manizales' },
];

export default function HomeScreen({ navigation }) {
    return (
    <View style={styles.container}>

      {/* Botón para agregar contacto */}
        <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Nuevo')}
        activeOpacity={0.8}
        >
        <Text style={styles.addButtonText}>
            Agregar Nuevo Contacto
        </Text>
        </TouchableOpacity>

      {/* Lista de contactos */}
        <FlatList
        data={contactosFicticios}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate('Detalle', {
                id: item.id,
                nombre: item.nombre,
                })
            }
            activeOpacity={0.8}
            >
            <Text style={styles.cardName}>
                {item.nombre}
            </Text>

            <Text style={styles.cardPhone}>
                {item.telefono}
            </Text>

            <Text style={styles.cardCity}>
                {item.ciudad}
            </Text>
            </TouchableOpacity>
        )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  // #1B1B1B
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1B1B1B',
    },

  // #8A2BE2
    addButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 18,

    // Sombra
    elevation: 4,
    shadowColor: '#8A2BE2',
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    },

  // #FFFFFF
    addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    },

  // #FFFFFF 25%
    card: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 10,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.50)',
    },

  // #FFFFFF
    cardName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    },

  // #FFFFFF 50%
    cardPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.50)',
    marginTop: 5,
    },

  // #EE82EE
    cardCity: {
    fontSize: 14,
    color: '#EE82EE',
    marginTop: 5,
    },
});