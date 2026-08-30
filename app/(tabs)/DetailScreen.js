import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const contactosFicticios = [
    {
    id: "100100",
    nombre: "Carlos Gómez",
    telefono: "3001234567",
    ciudad: "Medellín",
    },
    {
    id: "200200",
    nombre: "Ana Martínez",
    telefono: "3119876543",
    ciudad: "Bogotá",
    },
    {
    id: "300300",
    nombre: "Luis Rodríguez",
    telefono: "3205554433",
    ciudad: "Cali",
    },
    {
    id: "400400",
    nombre: "María López",
    telefono: "3102223344",
    ciudad: "Barranquilla",
    },
    {
    id: "500500",
    nombre: "Jorge Pérez",
    telefono: "3156667788",
    ciudad: "Cartagena",
    },
    {
    id: "600600",
    nombre: "Sofía Ramírez",
    telefono: "3124445566",
    ciudad: "Bucaramanga",
    },
    {
    id: "700700",
    nombre: "Andrés Torres",
    telefono: "3137778899",
    ciudad: "Pereira",
    },
    {
    id: "800800",
    nombre: "Valentina Castro",
    telefono: "3148889900",
    ciudad: "Manizales",
    },
];

export default function DetailScreen() {
    const { id } = useLocalSearchParams();

    const contacto = contactosFicticios.find((item) => item.id === id);

    if (!contacto) {
    return (
        <View style={styles.container}>
        <View style={styles.errorCard}>
            <Text style={styles.errorText}>Contacto no encontrado.</Text>
        </View>
        </View>
    );
    }

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Detalle del contacto</Text>

        <View style={styles.card}>    
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.value}>{contacto.nombre}</Text>
        <View style={styles.separator} />
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.value}>{contacto.telefono}</Text>
        <View style={styles.separator} />
            <Text style={styles.label}>Ciudad</Text>
            <Text style={styles.value}>{contacto.ciudad}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1B1B1B",
    },

    title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    },

    card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.50)",
    elevation: 4,
    },

    label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.50)",
    marginBottom: 5,
    },

    value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    },

    separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginVertical: 16,
    },

    errorCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255, 0, 0, 0.15)",
    borderWidth: 1,
    borderColor: "#FF0000",
    },

    errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
    textAlign: "center",
    },
});
