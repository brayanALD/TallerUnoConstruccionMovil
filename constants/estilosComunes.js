import { StyleSheet } from 'react-native';

// Estilos repetidos de forma idéntica en varias pantallas de app/(tabs)/
// (tarjeta/texto de error y contenedor de spinner + texto de carga).
export const estilosComunes = StyleSheet.create({
    errorCard: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        borderWidth: 1,
        borderColor: '#FF0000',
    },

    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
        textAlign: 'center',
    },

    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});
