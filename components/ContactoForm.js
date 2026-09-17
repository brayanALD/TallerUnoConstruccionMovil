import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { estilosComunes } from '../constants/estilosComunes';

export default function ContactoForm({
    title,
    nombre,
    telefono,
    ciudad,
    onChangeNombre,
    onChangeTelefono,
    onChangeCiudad,
    guardando,
    savingLabel,
    saveLabel,
    saveAccessibilityLabel,
    onSave,
    onCancel,
}) {
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
                    {title}
                </Text>

                <TextInput
                    placeholder="Nombre completo"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={nombre}
                    onChangeText={onChangeNombre}
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Nombre completo"
                />

                <TextInput
                    placeholder="Teléfono"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={telefono}
                    onChangeText={onChangeTelefono}
                    keyboardType="phone-pad"
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Teléfono"
                />

                <TextInput
                    placeholder="Ciudad"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={ciudad}
                    onChangeText={onChangeCiudad}
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Ciudad"
                />

                <TouchableOpacity
                    style={[styles.saveButton, guardando && styles.saveButtonDisabled]}
                    onPress={onSave}
                    activeOpacity={0.8}
                    disabled={guardando}
                    accessibilityRole="button"
                    accessibilityLabel={saveAccessibilityLabel}
                >
                    {guardando ? (
                        <View style={estilosComunes.loadingContainer}>
                            <ActivityIndicator color="#FFFFFF" size="small" />
                            <Text style={styles.saveButtonText}>
                                {savingLabel}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {saveLabel}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
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
});
