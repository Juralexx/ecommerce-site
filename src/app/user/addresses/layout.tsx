import React from 'react';
import { isAuthenticated } from '@/api/session';
import { redirect } from 'next/navigation';

interface Props {
    children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
    const user = await isAuthenticated();

    if (!user) {
        return redirect('/login?redirection=/user/addresses');
    } else {
        return (
            <>{children}</>
        )
    }
}