import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function EditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const fetchContacto = async () => {
            setCargando(true);
            setError(false);
            try {
                const docRef = doc(db, 'contactos', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNombre(data.nombre ?? '');
                    setTelefono(data.telefono ?? '');
                    setCiudad(data.ciudad ?? '');
                } else {
                    setError(true);
                }
            } catch (fetchError) {
                console.error("Error al obtener el contacto para editar: ", fetchError);
                setError(true);
            } finally {
                setCargando(false);
            }
        };

        fetchContacto();
    }, [id]);

    const handleSave = async () => {
        // Validar que ningún campo esté vacío
        if (!nombre.trim() || !telefono.trim() || !ciudad.trim()) {
            Alert.alert(
                'Campos incompletos',
                'Por favor diligencie todos los campos antes de guardar.'
            );
            return;
        }

        setGuardando(true);
        try {
            await updateDoc(doc(db, 'contactos', id), {
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
                <View style={styles.errorCard}>
                    <Text style={styles.errorText}>
                        No se pudo cargar el contacto. Verifique su conexión.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>
                    Editar Contacto
                </Text>

                <TextInput
                    placeholder="Nombre completo"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Nombre completo"
                />

                <TextInput
                    placeholder="Teléfono"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={telefono}
                    onChangeText={setTelefono}
                    keyboardType="phone-pad"
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Teléfono"
                />

                <TextInput
                    placeholder="Ciudad"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={ciudad}
                    onChangeText={setCiudad}
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Ciudad"
                />

                <TouchableOpacity
                    style={[styles.saveButton, guardando && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                    disabled={guardando}
                    accessibilityRole="button"
                    accessibilityLabel="Guardar cambios"
                >
                    {guardando ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="#FFFFFF" size="small" />
                            <Text style={styles.saveButtonText}>
                                Guardando...
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.saveButtonText}>
                            Guardar Cambios
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                    disabled={guardando}
                    accessibilityRole="button"
                    accessibilityLabel="Cancelar"
                >
                    <Text style={styles.cancelButtonText}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B1B',
    },

    scrollContent: {
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 25,
    },

    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        color: '#FFFFFF',
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
        elevation: 4,
        shadowColor: '#8A2BE2',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
    },

    saveButtonDisabled: {
        opacity: 0.6,
        elevation: 0,
        shadowOpacity: 0,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    cancelButton: {
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
    },

    cancelButtonText: {
        color: '#EE82EE',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    errorCard: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        borderWidth: 1,
        borderColor: '#FF0000',
        margin: 20,
    },

    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
        textAlign: 'center',
    },
});
