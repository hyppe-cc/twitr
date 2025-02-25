/* this icon did not use the colorClassName Context */
import Icon from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Icon name={focused ? 'search' : 'search-outline'} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Icon name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
