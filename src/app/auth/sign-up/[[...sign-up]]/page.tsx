'use client';

import { SignUp } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function SignInPage() {
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sync`, {
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('User synced on login:', data);
                    redirect('/dashboard');
                })
                .catch((err) => {
                    console.error('Error syncing user on login:', err);
                    redirect('/');
                });
        }
    }, [isSignedIn]);

    return (
        <div className="flex justify-center items-center h-full bg-gray-100 py-4">
            <SignUp
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
