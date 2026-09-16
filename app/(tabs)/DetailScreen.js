import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDetalle = async () => {
            setLoading(true);
            setError(false);
            try {
                const docRef = doc(db, 'contactos', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContacto(docSnap.data());
                }
            } catch (error) {
                console.error("Error al obtener el detalle del contacto: ", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchDetalle();
    }, [id]);

    // Mostrar indicador de carga mientras se obtienen los datos
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator 
                    size="large" 
                    color="#8A2BE2" 
                    style={{ marginTop: 20 }} 
                />
            </View>
        );
    }

    // Mostrar mensaje si falló la consulta a Firestore
    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.errorCard}>
                    <Text style={styles.errorText}>
                        No se pudo cargar el contacto. Verifique su conexión.
                    </Text>
                </View>
            </View>
        );
    }

    // Mostrar mensaje si el contacto no existe
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