import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Inicio',
        }}
      />

      <Tabs.Screen
        name="AddScreen"
        options={{
          title: 'Agregar',
        }}
      />

      <Tabs.Screen
        name="DetailScreen"
        options={{
          title: 'Detalle',
        }}
      />
    </Tabs>
  );
}