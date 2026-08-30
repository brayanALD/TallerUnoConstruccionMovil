import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

// Datos de prueba (quemados) para verificar la navegación
const contactosFicticios = [
    { id: '1', nombre: 'Carlos Gómez', telefono: '3001234567', ciudad: 'Medellín' },
    { id: '2', nombre: 'Ana Martínez', telefono: '3119876543', ciudad: 'Bogotá' },
    { id: '3', nombre: 'Luis Rodríguez', telefono: '3205554433', ciudad: 'Cali' },
];

export default function HomeScreen({ navigation }) {
    return (
    <View style={styles.container}>
      {/* Botón para navegar a la pantalla de Nuevo Contacto */}
        <View style={styles.buttonContainer}>
        <Button 
            title="Agregar Nuevo Contacto" 
            onPress={() => navigation.navigate('Nuevo')} 
        />
        </View>

      {/* Lista con desplazamiento de contactos */}
        <FlatList
        data={contactosFicticios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { id: item.id, nombre: item.nombre })}
            >
            <Text style={styles.cardName}>{item.nombre}</Text>
            <Text style={styles.cardPhone}>{item.telefono}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    buttonContainer: { marginBottom: 16 },
    card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 10, elevation: 2 },
    cardName: { fontSize: 16, fontWeight: 'bold' },
    cardPhone: { color: '#666', marginTop: 4 },
});