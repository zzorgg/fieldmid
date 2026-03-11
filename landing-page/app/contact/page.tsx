'use client'

import { useState } from 'react'

import { HeroHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitContactMessage } from '@/lib/contact-messages'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setStatus(null)

        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            await submitContactMessage({
                firstName: String(formData.get('firstName') ?? ''),
                lastName: String(formData.get('lastName') ?? ''),
                email: String(formData.get('email') ?? ''),
                company: String(formData.get('company') ?? ''),
                message: String(formData.get('message') ?? ''),
            })

            form.reset()
            setStatus({ type: 'success', message: 'Message sent successfully.' })
        } catch {
            setStatus({ type: 'error', message: 'Unable to send your message right now. Please try again in a moment.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <HeroHeader />
            <section className="flex min-h-screen bg-transparent px-4 py-16 md:py-32">
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="m-auto h-fit w-full max-w-md">
                    <div className="p-8 pb-6">
                        <div>
                            <p className="text-sm">Ready to get started? Our team will help you.</p>
                        </div>

                        <hr className="my-4 border-dashed" />

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="block text-sm">
                                        First name
                                    </Label>
                                    <Input type="text" id="firstName" name="firstName" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="block text-sm">
                                        Last name
                                    </Label>
                                    <Input type="text" id="lastName" name="lastName" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="block text-sm">
                                    Work email
                                </Label>
                                <Input type="email" id="email" name="email" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="block text-sm">
                                    Company
                                </Label>
                                <Input type="text" id="company" name="company" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="block text-sm">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us about your needs..."
                                    className="min-h-28"
                                />
                            </div>

                            {status && (
                                <p className={status.type === 'error' ? 'text-sm text-destructive' : 'text-sm text-primary'}>
                                    {status.message}
                                </p>
                            )}

                            <Button className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}