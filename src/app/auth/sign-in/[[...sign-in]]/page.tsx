'use client';

import { SignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function SignUpPage() {
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            // Call backend to sync user
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/me`, {
                credentials: 'include', // required if using cookies or Clerk JWTs
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Synced user:', data);
                    redirect('/dashboard');
                })
                .catch((err) => {
                    console.error('Error syncing user:', err);
                    redirect('/'); // still redirect even if it fails
                });
        }
    }, [isSignedIn]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                        card: 'shadow-lg rounded-lg',
                    },
                }}
            />
        </div>
    );
}
