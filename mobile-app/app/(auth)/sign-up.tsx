import { router } from 'expo-router';
import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { SignUpForm } from '@/components/sign-up-form';

export default function SignUpScreen() {
  return (
    <AuthScreenLayout onBack={() => router.back()}>
      <SignUpForm
        onSubmit={() => router.replace('/(tabs)')}
        onSignInPress={() => router.replace('/(auth)/login')}
        onSocialPress={() => router.replace('/(tabs)')}
      />
    </AuthScreenLayout>
  );
}
