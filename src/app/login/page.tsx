"use client"

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { login } from '@/api/auth';
import useError from '@/functions/useError';
import { Input, Alert, Button } from '@/components/global';
import Icon from '@/components/global/icons/Icon';

export default function LogIn() {
    //Url search params
    const searchParams = useSearchParams();
    //Variable handling user email and password
    const [datas, setDatas] = React.useState<Record<string, string>>({ email: '', password: '' });
    //Boolean to handle password visibility state
    const [passwordShown, setPasswordShown] = React.useState<boolean>(false);
    //Error hook
    const { error, setError } = useError();

    /**
     * Handle login request
     * @param event Form submit event - Needed to prevent default page reload on form submit
     */

    async function handleLogin(event: any) {
        //Prevent default page reload on form submit
        event.preventDefault();
        //Return error if email is missing
        if (!datas.email)
            return setError({ error: "email", message: 'Veuillez renseigner l\'email.' });
        //Return error if password is missing
        else if (!datas.password)
            return setError({ error: "password", message: 'Veuillez saisir votre mot de passe.' });
        //Else remove previous errors
        else setError({ error: "", message: "" });

        //Submit login informations to server
        const { errors } = await login(datas.email, datas.password);
        //If the server return an error, retrieve it
        if (errors.message) {
            return setError(errors);
        }
        //Else redirect to the home page or the redirection URL if there's one
        else {
            //Get the redirection URL
            const redirection_url = searchParams.get('redirection');

            if (redirection_url) {
                return window.location.pathname = redirection_url;
            } else {
                return window.location.pathname = '/';
            }
        }
    }
    //Variable to return the password input icon based on password visibility state
    const passwordIcon = passwordShown ? 'Visible' : 'Hidden';

    return (
        <div className='w-full h-full min-h-[800px] bg-one flex items-center justify-center'>
            <div className='w-full max-w-lg m-auto bg-zero p-6 rounded-lg bordered'>
                {searchParams.get('registered') &&
                    <Alert type="success">
                        Votre compte a bien été créé ! Veuillez vous connecter.
                    </Alert>
                }
                <div className='flex flex-col items-center justify-center pt-6 pb-3'>
                    <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 overflow-hidden'>
                        <Icon name="Lock" className="w-10 h-10 white" />
                    </div>
                    <h2>Connexion</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='py-3'>
                        <Input
                            required
                            id="email"
                            name="Email"
                            placeholder="Email"
                            value={datas.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, email: e.target.value }))}
                            isError={error.error === 'email'}
                        />
                        {error.error === 'email' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                    <div className='py-3'>
                        <Input
                            required
                            id="password"
                            name="Mot de passe"
                            type={passwordShown ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={datas.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, password: e.target.value }))}
                            isError={error.error === 'password'}
                            endIcon={<Icon name={passwordIcon} onClick={() => setPasswordShown(!passwordShown)} />}
                        />
                        {error.error === 'password' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                        <div className='pt-3 text-right'>
                            <Link href="#" className='custom-link'>
                                Mot de passe oublié ?
                            </Link>
                        </div>
                    </div>
                    <Button type="submit" className='v-primary fullwidth !my-5'>
                        Connexion
                    </Button>
                </form>
                <div className='mt-5 py-5 border-t border-slate-200'>
                    <h3 className='font-semibold py-3'>Création de compte</h3>
                    <Button href="/register" className='v-outline fullwidth is-link'>
                        Créer mon compte
                    </Button>
                </div>
                <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 12 }}>
                    Copyright © Nom du site {new Date().getFullYear()}.
                </p>
            </div>
        </div>
    );
};