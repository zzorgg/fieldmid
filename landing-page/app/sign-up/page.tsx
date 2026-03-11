import GuestGuard from '@/components/guest-guard'
import SignUpForm from '@/components/signup-form'

export default function Page() {
    return (
        <GuestGuard>
            <SignUpForm />
        </GuestGuard>
    )
}
