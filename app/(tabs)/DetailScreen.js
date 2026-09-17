import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteContacto } from "../../services/contactos";
import { useContacto } from "../../hooks/useContacto";
import { estilosComunes } from "../../constants/estilosComunes";
import { COLORES } from "../../constants/colores";

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
                    color={COLORES.acento}
                    style={{ marginTop: 20 }}
                />
            </View>
        );
    }

    // Mostrar mensaje si falló la consulta a Firestore
    if (error) {
        return (
            <View style={styles.container}>
                <View style={estilosComunes.errorCard}>
                    <Text style={estilosComunes.errorText}>
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
                <View style={estilosComunes.errorCard}>
                    <Text style={estilosComunes.errorText}>Contacto no encontrado.</Text>
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
                <Text style={contacto.ciudad ? styles.value : styles.valueVacio}>
                    {contacto.ciudad || 'No especificada'}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.editButton, estilosComunes.sombraBotonPrimario]}
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
                    <View style={estilosComunes.loadingContainer}>
                        <ActivityIndicator color={COLORES.texto} size="small" />
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
        backgroundColor: COLORES.fondo,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORES.texto,
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
        color: COLORES.texto,
    },

    valueVacio: {
        fontSize: 18,
        fontStyle: "italic",
        color: "rgba(255, 255, 255, 0.50)",
    },

    separator: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        marginVertical: 16,
    },

    editButton: {
        backgroundColor: COLORES.acento,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },

    editButtonText: {
        color: COLORES.texto,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    deleteButton: {
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 12,
        borderWidth: 1,
        borderColor: COLORES.error,
    },

    deleteButtonDisabled: {
        opacity: 0.6,
    },

    deleteButtonText: {
        color: COLORES.error,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});