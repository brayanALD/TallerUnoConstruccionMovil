import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>¡Hola! Bienvenido al Directorio de Contactos</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ca3232',
    alignItems: 'center',
    justifyContent: 'center',
    },
    title: {
    fontSize: 18,
    fontWeight: 'bold',
    },
});