import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteContacto } from "../../services/contactos";
import { useContacto } from "../../hooks/useContacto";

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { contacto, loading, error } = useContacto(id);
    const [eliminando, setEliminando] = useState(false);

    const handleDelete = () => {
        Alert.alert(
            'Eliminar contacto',
            '¿Está seguro de que desea eliminar este contacto? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        setEliminando(true);
                        try {
                            await deleteContacto(id);
                            router.back();
                        } catch (deleteError) {
                            Alert.alert(
                                'Error',
                                'No se pudo eliminar el contacto. Inténtelo de nuevo.'
                            );
                            console.error("Error al eliminar el contacto: ", deleteError);
                        } finally {
                            setEliminando(false);
                        }
                    },
                },
            ]
        );
    };

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

            <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                    router.push({
                        pathname: '/(tabs)/EditScreen',
                        params: { id },
                    })
                }
                activeOpacity={0.8}
                disabled={eliminando}
                accessibilityRole="button"
                accessibilityLabel="Editar contacto"
            >
                <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.deleteButton, eliminando && styles.deleteButtonDisabled]}
                onPress={handleDelete}
                activeOpacity={0.8}
                disabled={eliminando}
                accessibilityRole="button"
                accessibilityLabel="Eliminar contacto"
            >
                {eliminando ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={styles.deleteButtonText}>Eliminando...</Text>
                    </View>
                ) : (
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                )}
            </TouchableOpacity>
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
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.50)",
    },

    label: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.65)",
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
        color: "#FF6B6B",
        textAlign: "center",
    },

    editButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        elevation: 4,
        shadowColor: '#8A2BE2',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
    },

    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    deleteButton: {
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },

    deleteButtonDisabled: {
        opacity: 0.6,
    },

    deleteButtonText: {
        color: '#FF6B6B',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});