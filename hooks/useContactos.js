import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Encapsula la carga de la lista de contactos (loading/error/refetch)
// para no repetir este patrón en cada pantalla que la necesite.
export function useContactos() {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchContactos = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const querySnapshot = await getDocs(collection(db, 'contactos'));
            const lista = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContactos(lista);
        } catch (err) {
            console.error("Error al obtener los contactos: ", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    // Recargar los contactos cada vez que la pantalla pasa al primer plano
    useFocusEffect(
        useCallback(() => {
            fetchContactos();
        }, [fetchContactos])
    );

    return { contactos, loading, error, refetch: fetchContactos };
}
