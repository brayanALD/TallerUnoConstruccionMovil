import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContactos } from '../../hooks/useContactos';
import { estilosComunes } from '../../constants/estilosComunes';
import { COLORES } from '../../constants/colores';

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { contactos, loading, refreshing, error, refetch } = useContactos();
    const [busqueda, setBusqueda] = useState('');

    const contactosFiltrados = useMemo(() => {
        const query = busqueda.trim().toLowerCase();
        if (!query) {
            return contactos;
        }
        return contactos.filter((contacto) =>
            [contacto.nombre, contacto.telefono, contacto.ciudad]
                .some((campo) => (campo ?? '').toLowerCase().includes(query))
        );
    }, [contactos, busqueda]);

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <TouchableOpacity
                style={[styles.addButton, estilosComunes.sombraBotonPrimario]}
                onPress={() => router.push('/(tabs)/AddScreen')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Agregar nuevo contacto"
            >
                <Text style={styles.addButtonText}>
                    Agregar Nuevo Contacto
                </Text>
            </TouchableOpacity>

            {/* Búsqueda por nombre, teléfono o ciudad */}
            {!loading && !error && contactos.length > 0 && (
                <TextInput
                    placeholder="Buscar por nombre, teléfono o ciudad"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    style={styles.searchInput}
                    accessibilityLabel="Buscar contacto"
                    returnKeyType="search"
                    autoCorrect={false}
                />
            )}

            {/* Indicador de carga mientras consulta Firestore */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={COLORES.acento}
                    style={{ marginTop: 20 }}
                />
            ) : error ? (
                /* Mensaje y reintento si falló la consulta */
                <View style={styles.errorContainer}>
                    <View style={[estilosComunes.errorCard, styles.errorCardFullWidth]}>
                        <Text style={estilosComunes.errorText}>
                            No se pudo cargar la lista de contactos.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={refetch}
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
            ) : contactosFiltrados.length === 0 ? (
                /* Mensaje si la búsqueda no arroja resultados */
                <Text style={styles.emptyText}>
                    No se encontraron contactos que coincidan con {'"'}{busqueda.trim()}{'"'}.
                </Text>
            ) : (
                /* Renderizado con FlatList para desplazamiento eficiente */
                <FlatList
                    data={contactosFiltrados}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => refetch({ silent: true })}
                            tintColor={COLORES.acento}
                            colors={[COLORES.acento]}
                        />
                    }
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

                            {item.ciudad ? (
                                <Text style={styles.cardCity}>
                                    {item.ciudad}
                                </Text>
                            ) : null}
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
        backgroundColor: COLORES.fondo,
    },

    addButton: {
        backgroundColor: COLORES.acento,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 18,
    },

    addButtonText: {
        color: COLORES.texto,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    searchInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        color: COLORES.texto,
        fontSize: 16,
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
        color: COLORES.texto,
    },

    cardPhone: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.65)',
        marginTop: 5,
    },

    cardCity: {
        fontSize: 14,
        color: COLORES.acentoSecundario,
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

    errorCardFullWidth: {
        width: '100%',
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
        color: COLORES.acentoSecundario,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});