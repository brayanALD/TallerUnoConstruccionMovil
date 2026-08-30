import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const contactosFicticios = [
    {
    id: "100100",
    nombre: "Carlos Gómez",
    telefono: "3001234567",
    ciudad: "Medellín",
    correo: "carlos.gomez@email.com",
    direccion: "Carrera 43A # 10-25",
    ocupacion: "Ingeniero de Software",
    },
    {
    id: "200200",
    nombre: "Ana Martínez",
    telefono: "3119876543",
    ciudad: "Bogotá",
    correo: "ana.martinez@email.com",
    direccion: "Calle 85 # 12-45",
    ocupacion: "Diseñadora Gráfica",
    },
    {
    id: "300300",
    nombre: "Luis Rodríguez",
    telefono: "3205554433",
    ciudad: "Cali",
    correo: "luis.rodriguez@email.com",
    direccion: "Carrera 6 # 15-30",
    ocupacion: "Administrador",
    },
    {
    id: "400400",
    nombre: "María López",
    telefono: "3102223344",
    ciudad: "Barranquilla",
    correo: "maria.lopez@email.com",
    direccion: "Calle 72 # 53-18",
    ocupacion: "Contadora",
    },
    {
    id: "500500",
    nombre: "Jorge Pérez",
    telefono: "3156667788",
    ciudad: "Cartagena",
    correo: "jorge.perez@email.com",
    direccion: "Carrera 2 # 34-15",
    ocupacion: "Gerente Comercial",
    },
    {
    id: "600600",
    nombre: "Sofía Ramírez",
    telefono: "3124445566",
    ciudad: "Bucaramanga",
    correo: "sofia.ramirez@email.com",
    direccion: "Carrera 27 # 42-12",
    ocupacion: "Arquitecta",
    },
    {
    id: "700700",
    nombre: "Andrés Torres",
    telefono: "3137778899",
    ciudad: "Pereira",
    correo: "andres.torres@email.com",
    direccion: "Calle 19 # 8-40",
    ocupacion: "Analista de Datos",
    },
    {
    id: "800800",
    nombre: "Valentina Castro",
    telefono: "3148889900",
    ciudad: "Manizales",
    correo: "valentina.castro@email.com",
    direccion: "Carrera 23 # 65-20",
    ocupacion: "Administradora",
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
        <View style={styles.separator} />
            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.value}>{contacto.correo}</Text>
        <View style={styles.separator} />
            <Text style={styles.label}>Dirección</Text>
            <Text style={styles.value}>{contacto.direccion}</Text>
        <View style={styles.separator} />
            <Text style={styles.label}>Ocupación</Text>
            <Text style={styles.value}>{contacto.ocupacion}</Text>
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
