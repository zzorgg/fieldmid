import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
    return (
        <div className="mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-xl">
                <Image
                    src="/nathan-dumlao-a3ra9eXUjvo-unsplash.jpg"
                    alt="Closed white steel gate"
                    width={1600}
                    height={900}
                    className="aspect-video w-full object-cover"
                    priority
                />
                <p className="absolute bottom-3 right-3 rounded-md bg-background/80 px-3 py-2 text-right text-xs text-foreground shadow-sm backdrop-blur-sm md:bottom-4 md:right-4">
                    Photo by{' '}
                    <a
                        href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                    >
                        Nathan Dumlao
                    </a>{' '}
                    on{' '}
                    <a
                        href="https://unsplash.com/photos/closed-white-steel-gate-a3ra9eXUjvo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                    >
                        Unsplash
                    </a>
                </p>
            </div>
            <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
                <p>Oops! The page you&apos;re trying to access doesn&apos;t exist.</p>
                <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
                    <Button asChild className="cursor-pointer">
                        <Link href="/">Go Back Home</Link>
                    </Button>
                    <Button asChild variant="ghost" className="flex cursor-pointer items-center gap-1">
                        <Link href="/contact">
                            <span>Contact Us</span>
                            <ArrowRightIcon size={32} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}