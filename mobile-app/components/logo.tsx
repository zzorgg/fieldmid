import { View, Text } from 'react-native';
import { FarmIcon } from 'phosphor-react-native';

export function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { container: 'w-10 h-10 rounded-xl', icon: 20 },
    md: { container: 'w-14 h-14 rounded-2xl', icon: 28 },
    lg: { container: 'w-20 h-20 rounded-3xl', icon: 40 },
  };
  const s = sizes[size];
  return (
    <View className={`${s.container} bg-primary items-center justify-center`}>
      <FarmIcon size={s.icon} color="white" weight="fill" />
    </View>
  );
}

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  return (
    <View className="items-center gap-3">
      <LogoMark size={size} />
      <Text className={`${textSizes[size]} font-semibold text-foreground tracking-tight`}>
        fieldmind
      </Text>
    </View>
  );
}
