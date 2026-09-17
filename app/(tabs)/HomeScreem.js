import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Función para obtener los documentos desde Firestore
    const fetchContactos = async () => {
        setLoading(true);
        setError(false);
        try {
            const querySnapshot = await getDocs(collection(db, 'contactos'));
            const lista = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContactos(lista);
        } catch (error) {
            console.error("Error al obtener los contactos: ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Recargar los contactos cada vez que la pantalla pasa al primer plano
    useFocusEffect(
        useCallback(() => {
            fetchContactos();
        }, [])
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/(tabs)/AddScreen')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Agregar nuevo contacto"
            >
                <Text style={styles.addButtonText}>
                    Agregar Nuevo Contacto
                </Text>
            </TouchableOpacity>

            {/* Indicador de carga mientras consulta Firestore */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#8A2BE2"
                    style={{ marginTop: 20 }}
                />
            ) : error ? (
                /* Mensaje y reintento si falló la consulta */
                <View style={styles.errorContainer}>
                    <Text style={styles.emptyText}>
                        No se pudo cargar la lista de contactos.
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchContactos}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel="Reintentar carga de contactos"
                    >
                        <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            ) : contactos.length === 0 ? (
                /* Mensaje si la colección está vacía */
                <Text style={styles.emptyText}>No hay contactos registrados.</Text>
            ) : (
                /* Renderizado con FlatList para desplazamiento eficiente */
                <FlatList
                    data={contactos}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: '/(tabs)/DetailScreen',
                                    params: {
                                        id: item.id,
                                    },
                                })
                            }
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel={`Ver detalle de ${item.nombre}`}
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
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1B1B1B',
    },

    addButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 18,
        elevation: 4,
        shadowColor: '#8A2BE2',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    card: {
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.50)',
    },

    cardName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    cardPhone: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.65)',
        marginTop: 5,
    },

    cardCity: {
        fontSize: 14,
        color: '#EE82EE',
        marginTop: 5,
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.50)',
    },

    errorContainer: {
        alignItems: 'center',
        marginTop: 30,
    },

    retryButton: {
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
    },

    retryButtonText: {
        color: '#EE82EE',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});