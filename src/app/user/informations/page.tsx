import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/api/session';
import UserTemplate from '@/templates/user.template';
import UserInformations from '@/templates/user.informations.template';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const user = await isAuthenticated();

    return {
        title: (user && user.name && user.lastname) ? `${user.name} ${user.lastname} - Profil` : 'Profil'
    };
};

export default async function UserInformationsPage({ params, searchParams }: Props) {
    const user = await isAuthenticated();

    //Redirect to home page if the user param match nothing
    if (!user || Object.keys(user).length === 0) {
        redirect('/');
    };

    return (
        <>
            <div className="relative w-full h-60">
                <div className="w-full h-full bg-primary" />
            </div>
            <div className='container-xxl pt-10 pb-20 -mt-48'>
                <UserTemplate user={user}>
                    <UserInformations user={user} />
                </UserTemplate>
            </div>
        </>
    )
}