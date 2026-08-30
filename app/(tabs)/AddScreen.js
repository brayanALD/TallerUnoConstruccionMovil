import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function AddScreen() {
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ciudad, setCiudad] = useState('');

    const handleSave = () => {
        // Por ahora solo regresamos a la lista
        router.back();
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Agregar Nuevo Contacto
            </Text>

            <TextInput
                placeholder="Nombre completo"
                placeholderTextColor="rgba(255, 255, 255, 0.50)"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />

            <TextInput
                placeholder="Teléfono"
                placeholderTextColor="rgba(255, 255, 255, 0.50)"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <TextInput
                placeholder="Ciudad"
                placeholderTextColor="rgba(255, 255, 255, 0.50)"
                value={ciudad}
                onChangeText={setCiudad}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
            >
                <Text style={styles.saveButtonText}>
                    Guardar Contacto
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.back()}
                activeOpacity={0.8}
            >
                <Text style={styles.cancelButtonText}>
                    Cancelar
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1B1B1B',
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
});