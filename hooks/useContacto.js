import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Encapsula la carga de un contacto individual (loading/error/refetch)
// para no repetir este patrón en DetailScreen y EditScreen.
export function useContacto(id) {
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchContacto = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const docRef = doc(db, 'contactos', id);
            const docSnap = await getDoc(docRef);
            setContacto(docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null);
        } catch (err) {
            console.error("Error al obtener el contacto: ", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchContacto();
    }, [fetchContacto]);

    return { contacto, loading, error, refetch: fetchContacto };
}
