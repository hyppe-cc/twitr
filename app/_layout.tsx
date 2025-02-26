import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import '../global.css';

import '../translation';

import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const shema = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={shema === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

          <Stack.Screen
            name="[profile]"
            getId={({ params }) => params?.profile}
            options={{ headerShown: true, headerTransparent: true }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
