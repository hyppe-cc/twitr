import '../global.css';

import '../translation';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

        <Stack.Screen name="[profile]" options={{ headerShown: true, headerTransparent: true }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
