import { router } from 'expo-router';
import { WifiSlashIcon, LightningIcon, ArrowsClockwiseIcon } from 'phosphor-react-native';
import { View } from 'react-native';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { THEME } from '@/lib/theme';

export default function GetStartedScreen() {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];

  return (
    <AuthScreenLayout keyboardAware={false}>
      <View className="flex-1 items-center justify-between py-4">
        <View className="flex-1 items-center justify-center gap-6">
          <Logo size="lg" />
          <View className="items-center gap-2 mt-2">
            <Text className="max-w-xs text-center text-lg text-muted-foreground">
               Field reporting that still works when the internet doesn't.
            </Text>
          </View>
        </View>

        <View className="w-full gap-3">
          <Button className="w-full" onPress={() => router.push('/(auth)/sign-up')}>
            <Text>Create account</Text>
          </Button>
          <Button variant="secondary" className="w-full" onPress={() => router.push('/(auth)/login')}>
            <Text>Sign in</Text>
          </Button>
        </View>
      </View>
    </AuthScreenLayout>
  );
}
