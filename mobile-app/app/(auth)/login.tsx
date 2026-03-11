import { router } from 'expo-router';
import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { SignInForm } from '@/components/sign-in-form';

export default function LoginScreen() {
  return (
    <AuthScreenLayout onBack={() => router.back()}>
      <SignInForm
        onSubmit={() => router.replace('/(tabs)')}
        onSignUpPress={() => router.replace('/(auth)/sign-up')}
        onSocialPress={() => router.replace('/(tabs)')}
      />
    </AuthScreenLayout>
  );
}
