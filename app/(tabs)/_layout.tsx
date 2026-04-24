import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#fff',
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#fff',
        },
        headerTintColor: isDark ? '#fff' : '#000',
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ApeTracker',
          tabBarLabel: 'Tracker',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="trending-up" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="information-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({
  name,
  color,
  size,
}: {
  name: ComponentProps<typeof Ionicons>['name'];
  color: string;
  size: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
}

