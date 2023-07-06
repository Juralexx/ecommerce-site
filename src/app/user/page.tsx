import React from 'react';
import { redirect } from 'next/navigation';

export default function Layout() {
    return redirect('/user/informations');
}