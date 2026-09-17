import { useRef } from 'react';
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
import { COLORES } from '../constants/colores';

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
    const telefonoInputRef = useRef(null);
    const ciudadInputRef = useRef(null);

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
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => telefonoInputRef.current?.focus()}
                />

                <TextInput
                    ref={telefonoInputRef}
                    placeholder="Teléfono"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={telefono}
                    onChangeText={onChangeTelefono}
                    keyboardType="phone-pad"
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Teléfono"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ciudadInputRef.current?.focus()}
                />

                <TextInput
                    ref={ciudadInputRef}
                    placeholder="Ciudad"
                    placeholderTextColor="rgba(255, 255, 255, 0.50)"
                    value={ciudad}
                    onChangeText={onChangeCiudad}
                    style={styles.input}
                    editable={!guardando}
                    accessibilityLabel="Ciudad"
                    returnKeyType="done"
                    onSubmitEditing={onSave}
                />

                <TouchableOpacity
                    style={[styles.saveButton, estilosComunes.sombraBotonPrimario, guardando && styles.saveButtonDisabled]}
                    onPress={onSave}
                    activeOpacity={0.8}
                    disabled={guardando}
                    accessibilityRole="button"
                    accessibilityLabel={saveAccessibilityLabel}
                >
                    {guardando ? (
                        <View style={estilosComunes.loadingContainer}>
                            <ActivityIndicator color={COLORES.texto} size="small" />
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
        backgroundColor: COLORES.fondo,
    },

    scrollContent: {
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORES.texto,
        marginBottom: 25,
    },

    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        color: COLORES.texto,
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: COLORES.acento,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },

    saveButtonDisabled: {
        opacity: 0.6,
        elevation: 0,
        shadowOpacity: 0,
    },

    saveButtonText: {
        color: COLORES.texto,
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
        color: COLORES.acentoSecundario,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
