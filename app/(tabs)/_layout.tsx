import { Tabs } from 'expo-router';
import { Text } from 'react-native';
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
            <TabBarIcon name="chart-line" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="information-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// Simple icon component using Unicode symbols
function TabBarIcon({ name }: { name: string; color: string; size: number }) {
  const icons: { [key: string]: string } = {
    'chart-line': '📈',
    'information-circle': 'ℹ️',
  };
  
  return (
    <Text style={{ fontSize: 24 }}>
      {icons[name] || '•'}
    </Text>
  );
}

