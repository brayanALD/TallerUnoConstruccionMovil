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
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function HomeScreen() {
    const router = useRouter();
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los documentos desde Firestore
    const fetchContactos = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'contactos'));
            const lista = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContactos(lista);
        } catch (error) {
            console.error("Error al obtener los contactos: ", error);
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
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/(tabs)/AddScreen')}
                activeOpacity={0.8}
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
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
        color: 'rgba(255, 255, 255, 0.50)',
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
});