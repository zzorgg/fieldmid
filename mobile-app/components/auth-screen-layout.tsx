import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'phosphor-react-native';

import { Button } from '@/components/ui/button';
import { THEME } from '@/lib/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type AuthScreenLayoutProps = PropsWithChildren<{
  onBack?: () => void;
  keyboardAware?: boolean;
}>;

export function AuthScreenLayout({
  children,
  onBack,
  keyboardAware = true,
}: AuthScreenLayoutProps) {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];

  const content = (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="flex-grow px-6 py-4">
      {onBack ? (
        <Button
          variant="ghost"
          size="icon"
          className="mb-6 rounded-xl bg-muted"
          onPress={onBack}>
          <ArrowLeftIcon size={20} color={palette.mutedForeground} weight="bold" />
        </Button>
      ) : null}
      {children}
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {keyboardAware ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}