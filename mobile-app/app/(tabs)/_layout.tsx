import { Tabs } from 'expo-router';
import { HouseIcon, MagnifyingGlassIcon } from 'phosphor-react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { THEME } from '@/lib/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.mutedForeground,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopColor: palette.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HouseIcon size={24} color={color} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <MagnifyingGlassIcon size={24} color={color} weight="bold" />,
        }}
      />
    </Tabs>
  );
}
