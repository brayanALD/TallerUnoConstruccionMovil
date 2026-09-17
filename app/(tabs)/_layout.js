import { Stack } from 'expo-router';

export default function TabsLayout() {
    return (
    <Stack>
        <Stack.Screen
        name="HomeScreem"
        options={{ headerShown: false }}
        />

        <Stack.Screen
        name="AddScreen"
        options={{ title: 'Agregar contacto' }}
        />

        <Stack.Screen
        name="DetailScreen"
        options={{ title: 'Detalle del contacto' }}
        />

        <Stack.Screen
        name="EditScreen"
        options={{ title: 'Editar contacto' }}
        />
    </Stack>
    );
}