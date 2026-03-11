import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'phosphor-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { THEME } from '@/lib/theme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-4"
        showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-foreground mb-1">Explore</Text>
        <Text className="text-muted-foreground text-sm mb-8">
          Discover fields, data, and insights.
        </Text>

        <View className="bg-card border border-border rounded-2xl p-8 items-center gap-3">
          <MagnifyingGlassIcon size={40} color={palette.border} weight="bold" />
          <Text className="text-muted-foreground text-sm text-center">
            Explore features coming soon.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
