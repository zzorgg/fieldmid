import GuestGuard from '@/components/guest-guard'
import LoginForm from '@/components/login-form'

export default function LoginPage() {
    return (
        <GuestGuard>
            <LoginForm />
        </GuestGuard>
    )
}
