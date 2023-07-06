"use client"

import React from 'react'
import { Customer } from '@/types'
import { Alert, Button, FormControlLabel, Input, Radio } from '@/components/global';
import useError from '@/functions/useError';
import { updateCustomer } from '@/api/customers';
import { useRouter } from 'next/navigation';

interface UpdateUserProps extends Customer.Options {
    newPassword?: string,
    confirmPassword?: string,
}

interface Props {
    user: UpdateUserProps;
}
//Object containing needed properties to update user password
const passwords = { password: '', newPassword: '', confirmPassword: '' }

export default function UserInformations({ user }: Props) {
    //NextJS router
    const router = useRouter();
    //User object extended with passwords
    const [datas, setDatas] = React.useState<UpdateUserProps>({ ...user, ...passwords })
    //Boolean to handle informations update state
    const [updateInfos, setUpdateInfos] = React.useState<boolean>(false);
    //Boolean to handle password update state
    const [updatePassword, setUpdatePassword] = React.useState<boolean>(false);
    //Error hook
    const { error, setError } = useError();

    /**
     * Handle user informations update
     * @param event Form submit event - Needed to prevent default page reload on form submit
     */

    const updateUser = async () => {
        //Default updatable datas passed to the server
        let config: Partial<UpdateUserProps> = {
            title: datas.title,
            name: datas.name,
            lastname: datas.lastname,
            email: datas.email,
            phone: datas.phone
        };
        //If a new password has been entered
        if (datas.newPassword) {
            //If the new confirmed password is different from the new password, return an error
            if (datas.newPassword !== datas.confirmPassword) {
                return setError({ error: 'confirmPassword', message: 'Les mots de passe ne correspondent pas.' });
            }
            //Else pass the old password and new password to the 'config' object
            else {
                config.password = datas.password;
                config.newPassword = datas.newPassword;
            }
        }
        //Update customer function passed to the server
        const { errors } = await updateCustomer(user, config);
        //If the server return an error, return the error
        if (errors.message) {
            setError(errors);
        } else {
            //Else reload the page to display new informations
            router.replace(`/user/informations`);
        }
    }

    return (
        <div className='informations-page'>
            <div className="grid grid-cols-2 items-start w-full gap-x-8 md:gap-y-8 sm:grid-cols-1">
                <div className='p-5 bordered bg-white boxshadow-lg-colored rounded-xl'>
                    <div className='text-xl font-semibold mb-4'>
                        Mes informations
                    </div>
                    {/* title */}
                    {!updateInfos ? (
                        <div className='flex flex-col mb-3'>
                            <label className='font-semibold'>Titre</label>
                            <p className='py-2'>{user?.title ? (user.title === 'M' ? 'Monsieur' : 'Madame') : <em>Non renseigné</em>}</p>
                        </div>
                    ) : (
                        <div className='mb-3'>
                            <label className='block font-semibold ml-1'>
                                Titre
                            </label>
                            <div className='flex items-center'>
                                <FormControlLabel
                                    control={<Radio checked={datas.title === 'M'} />}
                                    onClick={() => setDatas(datas => ({ ...datas, title: 'M' }))}
                                >
                                    M.
                                </FormControlLabel>
                                <FormControlLabel
                                    control={<Radio checked={datas.title === 'Mme'} />}
                                    onClick={() => setDatas(datas => ({ ...datas, title: 'Mme' }))}
                                >
                                    Mme
                                </FormControlLabel>
                            </div>
                        </div>
                    )}
                    {/* lastname */}
                    {!updateInfos ? (
                        <div className='flex flex-col mb-3'>
                            <label className='font-semibold'>Nom</label>
                            <p className='py-2'>{user?.lastname ? user.lastname : <em>Non renseigné</em>}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col mb-3'>
                            <Input
                                name="Nom"
                                placeholder='Nom'
                                value={datas.lastname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, lastname: e.target.value }))}
                                isError={error.error === 'lastname'}
                            />
                            {error.error === 'lastname' &&
                                <Alert type="error">{error.message}</Alert>
                            }
                        </div>
                    )}
                    {/* name */}
                    {!updateInfos ? (
                        <div className='flex flex-col mb-3'>
                            <label className='font-semibold'>Prénom</label>
                            <p className='py-2'>{user?.name ? user.name : <em>Non renseigné</em>}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col mb-3'>
                            <Input
                                name="Prénom"
                                placeholder='Prénom'
                                value={datas.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, name: e.target.value }))}
                                isError={error.error === 'name'}
                            />
                            {error.error === 'name' &&
                                <Alert type="error">{error.message}</Alert>
                            }
                        </div>
                    )}
                    {/* email */}
                    <div className='flex flex-col mb-3'>
                        <label className='font-semibold'>Email</label>
                        <p className='py-2'>{user.email}</p>
                    </div>
                    {/* phone */}
                    {!updateInfos ? (
                        <div className='flex flex-col mb-3'>
                            <label className='font-semibold'>Téléphone mobile</label>
                            <p className='py-2'>{user?.phone ? user.phone : <em>Non renseigné</em>}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col mb-3'>
                            <Input
                                name="Téléphone mobile"
                                placeholder='Téléphone mobile'
                                value={datas.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, phone: e.target.value }))}
                                isError={error.error === 'phone'}
                            />
                            {error.error === 'phone' &&
                                <Alert type="error">{error.message}</Alert>
                            }
                        </div>
                    )}

                    {!updateInfos ? (
                        <div className="flex mt-5">
                            <Button className='v-primary fullwidth' onClick={() => setUpdateInfos(true)}>
                                Modifier mes informations
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-x-2 mt-5">
                            <Button className='v-classic' onClick={() => setUpdateInfos(false)}>
                                Annuler
                            </Button>
                            <Button className='v-primary fullwidth' onClick={async () => await updateUser()}>
                                Enregistrer
                            </Button>
                        </div>
                    )}
                </div>
                <div className='p-5 bordered bg-white boxshadow-lg-colored rounded-xl'>
                    <div className='text-xl font-semibold mb-4'>
                        Mon mot de passe
                    </div>
                    {!updatePassword ? (
                        <p>Vous pouvez changer à tout moment votre mot de passe en cliquant sur le bouton ci-dessous.</p>
                    ) : (
                        <div>
                            <div className='flex flex-col mb-3'>
                                <Input
                                    name="Ancien mot de passe actuel"
                                    placeholder='Ancien mot de passe'
                                    value={datas.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, password: e.target.value }))}
                                    type='password'
                                    isError={error.error === 'password'}
                                />
                                {error.error === 'password' &&
                                    <Alert type="error">{error.message}</Alert>
                                }
                            </div>
                            <div className='flex flex-col mb-3'>
                                <Input
                                    name="Nouveau mot de passe"
                                    placeholder='Nouveau mot de passe'
                                    value={datas.newPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, newPassword: e.target.value }))}
                                    type='password'
                                    isError={error.error === 'newPassword'}
                                />
                                {error.error === 'newPassword' &&
                                    <Alert type="error">{error.message}</Alert>
                                }
                            </div>
                            <div className='flex flex-col mb-3'>
                                <Input
                                    name="Confirmer nouveau mot de passe"
                                    placeholder='Confirmer nouveau mot de passe'
                                    value={datas.confirmPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(datas => ({ ...datas, confirmPassword: e.target.value }))}
                                    type='password'
                                    isError={error.error === 'confirmPassword'}
                                />
                                {error.error === 'confirmPassword' &&
                                    <Alert type="error">{error.message}</Alert>
                                }
                            </div>
                        </div>
                    )}
                    {!updatePassword ? (
                        <div className="flex mt-5">
                            <Button className='v-primary fullwidth' onClick={() => setUpdatePassword(true)}>
                                Modifier mon mot de passe
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-x-2 mt-5">
                            <Button className='v-classic' onClick={() => setUpdatePassword(false)}>
                                Annuler
                            </Button>
                            <Button className='v-primary fullwidth' onClick={async () => await updateUser()}>
                                Enregistrer
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}