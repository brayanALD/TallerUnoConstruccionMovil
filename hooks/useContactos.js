import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { getContactos } from '../services/contactos';

// Encapsula la carga de la lista de contactos (loading/error/refetch)
// para no repetir este patrón en cada pantalla que la necesite.
export function useContactos() {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);

    // `silent` evita reemplazar la lista por el spinner de pantalla completa,
    // para usarse con pull-to-refresh (RefreshControl) sobre datos ya visibles.
    const fetchContactos = useCallback(async ({ silent = false } = {}) => {
        if (silent) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(false);
        try {
            const lista = await getContactos();
            setContactos(lista);
        } catch (err) {
            console.error("Error al obtener los contactos: ", err);
            setError(true);
        } finally {
            if (silent) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }, []);

    // Recargar los contactos cada vez que la pantalla pasa al primer plano
    useFocusEffect(
        useCallback(() => {
            fetchContactos();
        }, [fetchContactos])
    );

    return { contactos, loading, refreshing, error, refetch: fetchContactos };
}
