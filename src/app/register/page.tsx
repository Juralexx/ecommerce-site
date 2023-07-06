"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/global/icons/Icon';
import useError from '@/functions/useError';
import { Input, Alert, Button } from '@/components/global';
import { createCustomer } from '@/api/customers';
import { Customer } from '@/types';
import { addActive, addClass, isEmailValid } from '@/functions/utils';

interface AddUserProps extends Customer.Options {
    confirmPassword?: string,
}

export default function Register() {
    //NextJS Router
    const router = useRouter();
    //Variable handling user name, lastname, email and password
    const [datas, setDatas] = React.useState<AddUserProps>({ ...Customer.defaultProps, confirmPassword: '' });
    //Boolean to handle password visibility state
    const [passwordShown, setPasswordShown] = React.useState<boolean>(false);
    //Error hook
    const { error, setError } = useError();

    /**
     * Handle register request
     * @param event Form submit event - Needed to prevent default page reload on form submit
     */

    async function handleRegister(event: any) {
        //Prevent default page reload on form submit
        event.preventDefault();
        //Return error if email is missing
        if (!datas.email)
            return setError({ error: "email", message: 'Veuillez renseigner l\'email.' });
        //Return error if password is missing
        else if (!datas.password)
            return setError({ error: "password", message: 'Veuillez saisir votre mot de passe.' });
        //Return error if password is different from confirm-password is missing
        else if (datas.password !== datas.confirmPassword)
            return setError({ error: 'confirm-password', message: 'Les mots de passe ne correspondent pas.' });
        //Else remove previous errors
        else setError({ error: "", message: "" });

        //Submit register informations to server
        const { errors } = await createCustomer(datas);
        //If the server return an error, retrieve it
        if (errors.message) {
            setError(errors);
        }
        //Else redirect to the login page
        else {
            router.replace('/login?registered=true');
        }
    }

    //Boolean to handle password strength card visibility state
    const [display, setDisplay] = React.useState<boolean>(false);
    //Variable to store the password strength :
    //- state : define if password is strong enough
    //- strength : array of strings to calculate the password strength, allow the check if a required condition is
    //filled to display it to the user
    const [secured, setSecured] = React.useState<Record<string, any>>({ state: false, strength: [] });
    //Variable to handle the inputs validity - store valid inputs IDs
    const [valid, setValid] = React.useState<string[]>([]);

    /**
     * Hook to handle inputs values validity
     * Needed to change inputs backgrounds based on the values validity
     */

    React.useEffect(() => {
        //Store the valid inputs IDs
        let validArr: string[] = [];
        //If the email exists and is valid, add it to valid inputs
        if (datas.email && isEmailValid(datas.email))
            validArr = [...validArr, "email"];
        //Else remove if from valid inputs
        else validArr = validArr.filter(e => e !== "email");

        //If 'secured' variable 'state' property is to true - meaning the password is strong enough, add password to valid inputs
        if (secured.state)
            validArr = [...validArr, "password"];
        //Else remove if from valid inputs
        else validArr = validArr.filter(e => e !== "password");

        //If the user has defined a password and the 'confirm-password' input value is the same, add 'confirm-assword' to valid inputs
        if (datas.password !== "" && datas.password === datas.confirmPassword)
            validArr = [...validArr, "confirm-password"];
        //Else remove if from valid inputs
        else validArr = validArr.filter(e => e !== "confirm-password");

        //Pass the results to the 'valid' variable
        setValid(validArr);
    }, [datas, secured])

    /**
     * Hook to calculate password strength
     */

    React.useEffect(() => {
        //If a password has been typed
        if (datas.password && datas.password.length > 0) {
            //Contains all the condition required to declare the password as strong enough
            let strength: string[] = [];
            //Check if password contains special chars
            const chars = datas.password.toString().match(/[[&\/\\#,+()$~%'":_*?<>{}]]/g);
            //Check if password contains lowercase
            const lowercase = datas.password.match(/[a-z]/g);
            //Check if password contains uppercase
            const uppercase = datas.password.match(/[A-Z]/g);
            //Check if password contains numbers
            const numeric = datas.password.match(/[0-9]/g);

            //If password contains at least one special chars
            if ((chars || []).length >= 1)
                strength = [...strength, "chars"];
            else strength = strength.filter(e => e !== "chars");
            //If password contains at least three lowercase
            if ((lowercase || []).length >= 3)
                strength = [...strength, "lowercase"];
            else strength = strength.filter(e => e !== "lowercase");
            //If password contains at least one uppercase
            if ((uppercase || []).length >= 1)
                strength = [...strength, "uppercase"];
            else strength = strength.filter(e => e !== "uppercase");
            //If password contains at least three numbers
            if ((numeric || []).length >= 3)
                strength = [...strength, "numeric"];
            else strength = strength.filter(e => e !== "numeric");
            //If password has at least a length of 12
            if (datas.password.length >= 12)
                strength = [...strength, "length"];
            else strength = strength.filter(e => e !== "length");

            //Pass the strength array to the 'secured' variable
            setSecured(prev => ({ ...prev, strength: strength }));

            //If the password is strong enough, change the 'secured' state
            if (strength.length === 5) {
                setSecured(prev => ({ ...prev, state: true }));
            } else setSecured(prev => ({ ...prev, state: false }));
        }
    }, [datas.password])

    /**
     * Return password strength based on the 'secured' 'strength' property
     */

    const addPasswordStrength = () => {
        if (secured.strength.length >= 5)
            return { strength: "strong", text: "Fort" };
        else if (secured.strength.length >= 3)
            return { strength: "medium", text: "Moyen" };
        else if (secured.strength.length <= 2)
            return { strength: "weak", text: "Faible" };
        else return { strength: "weak", text: "Faible" };
    }

    //Variable to return the password input icon based on password visibility state
    const passwordIcon = passwordShown ? 'Visible' : 'Hidden';

    return (
        <div className='w-full h-full min-h-[800px] bg-one flex items-center justify-center'>
            <div className='w-full max-w-lg m-auto bg-zero p-6 rounded-lg bordered'>
                <div className='flex flex-col items-center justify-center pt-6 pb-3'>
                    <div className='avatar'>
                        <img
                            className='w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 overflow-hidden'
                            src='/img/random-user.png'
                            alt=""
                        />
                    </div>
                    <h2>Inscription</h2>
                </div>
                <form onSubmit={(e) => handleRegister(e)}>
                    <div className='py-2'>
                        <div className='grid grid-cols-2 xs:grid-cols-1 gap-x-2 gap-y-3'>
                            <div>
                                <Input
                                    required
                                    id="name"
                                    name="Prénom"
                                    placeholder="Prénom"
                                    value={datas.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, name: e.target.value }))}
                                    isError={error.error === 'name'}
                                    isSuccess={valid.includes('name')}
                                />
                                {error.error === 'name' &&
                                    <Alert type="error">{error.message}</Alert>
                                }
                            </div>
                            <div>
                                <Input
                                    required
                                    id="lastname"
                                    name="Nom"
                                    placeholder="Nom"
                                    value={datas.lastname}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, lastname: e.target.value }))}
                                    isError={error.error === 'lastname'}
                                    isSuccess={valid.includes('lastname')}
                                />
                                {error.error === 'lastname' &&
                                    <Alert type="error">{error.message}</Alert>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='py-2'>
                        <Input
                            required
                            id="email"
                            name="Email"
                            placeholder="Email"
                            value={datas.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, email: e.target.value }))}
                            isError={error.error === 'email'}
                            isSuccess={valid.includes('email')}
                        />
                        {error.error === 'email' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                    <div className='py-2 relative' onClick={() => setDisplay(!display)}>
                        <Input
                            required
                            id="password"
                            name="Mot de passe"
                            type={passwordShown ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={datas.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, password: e.target.value }))}
                            isError={error.error === 'password'}
                            isSuccess={valid.includes('password')}
                            endIcon={<Icon name={passwordIcon} onClick={() => setPasswordShown(!passwordShown)} />}
                        />
                        {error.error === 'password' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                        <div className={`av-password-checker ${addActive(display)}`}>
                            <div className="password-strength">
                                <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                                <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                                <div className={`strength-item ${addPasswordStrength().strength}`}></div>
                                <div className={`strength ${addPasswordStrength().strength}`}>
                                    {addPasswordStrength().text}
                                </div>
                            </div>
                            <div className="checker-header">Votre mot de passe doit inclure : </div>
                            <div className={`checker ${addClass(secured.strength.includes('length'), 'valid')}`}>
                                {secured.strength.includes('length') ? <Icon name="Check" /> : <Icon name="Cross" />}
                                <p>Au moins 8 caractères</p>
                            </div>
                            <div className={`checker ${addClass(secured.strength.includes('uppercase'), 'valid')}`}>
                                {secured.strength.includes('uppercase') ? <Icon name="Check" /> : <Icon name="Cross" />}
                                <p>Au moins une lettre majuscule</p>
                            </div>
                            <div className={`checker ${addClass(secured.strength.includes('lowercase'), 'valid')}`}>
                                {secured.strength.includes('lowercase') ? <Icon name="Check" /> : <Icon name="Cross" />}
                                <p>Au moins une lettre minuscule</p>
                            </div>
                            <div className={`checker ${addClass(secured.strength.includes('numeric'), 'valid')}`}>
                                {secured.strength.includes('numeric') ? <Icon name="Check" /> : <Icon name="Cross" />}
                                <p>Au moins un chiffre</p>
                            </div>
                            <div className={`checker ${addClass(secured.strength.includes('chars'), 'valid')}`}>
                                {secured.strength.includes('chars') ? <Icon name="Check" /> : <Icon name="Cross" />}
                                <p>Au moins un des caractère spéciaux suivant : !@#$%^&*</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-2'>
                        <Input
                            required
                            id="confirm-password"
                            name="Confirmer mot de passe"
                            type={passwordShown ? 'text' : 'password'}
                            placeholder="Confirmer mot de passe"
                            value={datas.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            isError={error.error === 'confirm-password'}
                            isSuccess={valid.includes('confirm-password')}
                            endIcon={<Icon name={passwordIcon} onClick={() => setPasswordShown(!passwordShown)} />}
                        />
                        {error.error === 'confirm-password' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                    <Button type="submit" className='v-primary fullwidth !my-5'>
                        Connexion
                    </Button>
                </form>
                <div className='mt-5 py-5 border-t border-slate-200'>
                    <h3 className='font-semibold py-3'>Connexion</h3>
                    <Button href="/login" className='v-outline fullwidth is-link'>
                        Connexion
                    </Button>
                </div>
                <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 12 }}>
                    Copyright © Your Website {new Date().getFullYear()}.
                </p>
            </div>
        </div>
    );
};