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

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createContacto } from '../../services/contactos';
import { validarContacto } from '../../utils/validarContacto';

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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>
                    Agregar Nuevo Contacto
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
                    accessibilityLabel="Guardar contacto"
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
                            Guardar Contacto
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
});