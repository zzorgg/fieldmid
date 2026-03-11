/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

import { THEME } from '@/lib/theme';

const tintColorLight = THEME.light.primary;
const tintColorDark = THEME.dark.primary;

export const Colors = {
  light: {
    text: THEME.light.foreground,
    background: THEME.light.background,
    tint: tintColorLight,
    icon: THEME.light.mutedForeground,
    tabIconDefault: THEME.light.mutedForeground,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: THEME.dark.foreground,
    background: THEME.dark.background,
    tint: tintColorDark,
    icon: THEME.dark.mutedForeground,
    tabIconDefault: THEME.dark.mutedForeground,
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
