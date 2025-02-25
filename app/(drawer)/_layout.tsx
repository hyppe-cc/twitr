import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
        }}
      />
    </Drawer>
  );
}
