import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createContacto } from '../../services/contactos';
import { validarContacto } from '../../utils/validarContacto';
import ContactoForm from '../../components/ContactoForm';

export default function AddScreen() {
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [guardando, setGuardando] = useState(false);

    const handleSave = async () => {
        const mensajeError = validarContacto({ nombre, telefono, ciudad });
        if (mensajeError) {
            Alert.alert('Datos inválidos', mensajeError);
            return;
        }

        setGuardando(true);
        try {
            await createContacto({
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                ciudad: ciudad.trim(),
            });

            // Regresar automáticamente a la pantalla de Lista
            router.back();
        } catch (error) {
            Alert.alert(
                'Error',
                'No se pudo guardar el contacto. Inténtelo de nuevo.'
            );
            console.error("Error al guardar en Firestore: ", error);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <ContactoForm
            title="Agregar Nuevo Contacto"
            nombre={nombre}
            telefono={telefono}
            ciudad={ciudad}
            onChangeNombre={setNombre}
            onChangeTelefono={setTelefono}
            onChangeCiudad={setCiudad}
            guardando={guardando}
            savingLabel="Guardando..."
            saveLabel="Guardar Contacto"
            saveAccessibilityLabel="Guardar contacto"
            onSave={handleSave}
            onCancel={() => router.back()}
        />
    );
}
