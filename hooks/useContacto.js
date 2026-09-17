import { useCallback, useEffect, useState } from 'react';
import { getContacto } from '../services/contactos';

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
            const resultado = await getContacto(id);
            setContacto(resultado);
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
