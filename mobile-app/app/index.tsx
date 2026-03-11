import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LogoMark } from '@/components/logo';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { THEME } from '@/lib/theme';

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];

  useEffect(() => {
    let isMounted = true;

    async function redirect() {
      await new Promise((r) => setTimeout(r, 1600));

      if (!isMounted) {
        return;
      }

      router.replace('/(auth)/get-started');
    }

    redirect();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background gap-4">
        <ActivityIndicator className="mt-4" color={palette.primary} />
    </View>
  );
}
