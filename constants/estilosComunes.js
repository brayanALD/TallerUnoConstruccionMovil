import { StyleSheet } from 'react-native';
import { COLORES } from './colores';

// Estilos repetidos de forma idéntica en varias pantallas de app/(tabs)/
// (tarjeta/texto de error, contenedor de spinner + texto de carga, y la
// sombra del botón primario).
export const estilosComunes = StyleSheet.create({
    errorCard: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        borderWidth: 1,
        borderColor: COLORES.errorFuerte,
    },

    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORES.error,
        textAlign: 'center',
    },

    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    sombraBotonPrimario: {
        elevation: 4,
        shadowColor: COLORES.acento,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
    },
});
