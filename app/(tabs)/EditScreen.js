import {
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { updateContacto } from '../../services/contactos';
import { useContacto } from '../../hooks/useContacto';
import { validarContacto } from '../../utils/validarContacto';
import { estilosComunes } from '../../constants/estilosComunes';
import ContactoForm from '../../components/ContactoForm';

export default function EditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { contacto, loading: cargando, error } = useContacto(id);

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [guardando, setGuardando] = useState(false);
    const [formInicializado, setFormInicializado] = useState(false);

    // Precargar el formulario apenas el contacto termina de cargar, sin pasar
    // por un efecto (evita el render en cascada que marca react-hooks/set-state-in-effect)
    if (contacto && !formInicializado) {
        setNombre(contacto.nombre ?? '');
        setTelefono(contacto.telefono ?? '');
        setCiudad(contacto.ciudad ?? '');
        setFormInicializado(true);
    }

    const handleSave = async () => {
        const mensajeError = validarContacto({ nombre, telefono, ciudad });
        if (mensajeError) {
            Alert.alert('Datos inválidos', mensajeError);
            return;
        }

        setGuardando(true);
        try {
            await updateContacto(id, {
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                ciudad: ciudad.trim(),
            });

            // Regresar automáticamente a la pantalla de Detalle
            router.back();
        } catch (saveError) {
            Alert.alert(
                'Error',
                'No se pudo actualizar el contacto. Inténtelo de nuevo.'
            );
            console.error("Error al actualizar en Firestore: ", saveError);
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
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

    if (error) {
        return (
            <View style={styles.container}>
                <View style={[estilosComunes.errorCard, styles.errorCardMargin]}>
                    <Text style={estilosComunes.errorText}>
                        No se pudo cargar el contacto. Verifique su conexión.
                    </Text>
                </View>
            </View>
        );
    }

    if (!contacto) {
        return (
            <View style={styles.container}>
                <View style={[estilosComunes.errorCard, styles.errorCardMargin]}>
                    <Text style={estilosComunes.errorText}>Contacto no encontrado.</Text>
                </View>
            </View>
        );
    }

    return (
        <ContactoForm
            title="Editar Contacto"
            nombre={nombre}
            telefono={telefono}
            ciudad={ciudad}
            onChangeNombre={setNombre}
            onChangeTelefono={setTelefono}
            onChangeCiudad={setCiudad}
            guardando={guardando}
            savingLabel="Guardando..."
            saveLabel="Guardar Cambios"
            saveAccessibilityLabel="Guardar cambios"
            onSave={handleSave}
            onCancel={() => router.back()}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B1B',
    },

    errorCardMargin: {
        margin: 20,
    },
});
