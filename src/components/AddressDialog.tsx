"use client"

import React from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Input } from '@/components/global';

interface Props {
    open: boolean,
    title: string,
    state: any,
    setState: (...args: any) => void,
    onValidate: () => void,
    onClose: () => void,
    error: { error: string, message: string }
}

export default function AddressDialog({ open, title, state, setState, onValidate, onClose, error }: Props) {
    const { address } = state;

    return (
        <Dialog open={open} onClose={onClose} mobileFull>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <div className='grid grid-cols-2 gap-2 xs:grid-cols-1 mb-4'>
                    <div>
                        <Input
                            name="Nom"
                            placeholder='Nom'
                            value={address.lastname}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, lastname: e.target.value } }))}
                            isError={error.error === 'lastname'}
                        />
                        {error.error === 'lastname' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                    <div>
                        <Input
                            name="Prénom"
                            placeholder='Prénom'
                            value={address.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, name: e.target.value } }))}
                            isError={error.error === 'name'}
                        />
                        {error.error === 'name' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                </div>
                <div className='mb-4'>
                    <Input
                        name="Société"
                        placeholder='Société'
                        value={address.society}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, society: e.target.value } }))}
                        isError={error.error === 'society'}
                    />
                    {error.error === 'society' &&
                        <Alert type="error">{error.message}</Alert>
                    }
                </div>
                <div className='mb-4'>
                    <Input
                        name="Adresse"
                        placeholder='Numéro et nom de la rue'
                        value={address.street}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                        isError={error.error === 'street'}
                    />
                    {error.error === 'street' &&
                        <Alert type="error">{error.message}</Alert>
                    }
                </div>
                <div className='mb-4'>
                    <Input
                        name="Complément d'adresse"
                        placeholder='Appt, bâtiment, étage...'
                        value={address.complement}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, complement: e.target.value } }))}
                        isError={error.error === 'complement'}
                    />
                    {error.error === 'complement' &&
                        <Alert type="error">{error.message}</Alert>
                    }
                </div>
                <div className='flex gap-x-2 mb-4'>
                    <div className='w-1/4'>
                        <Input
                            name="Code Postal"
                            placeholder='00 000'
                            value={address.postcode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, postcode: e.target.value } }))}
                            isError={error.error === 'postcode'}
                        />
                        {error.error === 'postcode' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                    <div className='w-3/4'>
                        <Input
                            name="Ville"
                            placeholder='Ville'
                            value={address.city}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                            isError={error.error === 'city'}
                        />
                        {error.error === 'city' &&
                            <Alert type="error">{error.message}</Alert>
                        }
                    </div>
                </div>
                <div className='mb-4'>
                    <Input
                        name="Téléphone mobile"
                        placeholder='06 00 00 00 00'
                        value={address.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState((prev: any) => ({ ...prev, address: { ...prev.address, phone: e.target.value } }))}
                        isError={error.error === 'phone'}
                    />
                    {error.error === 'phone' &&
                        <Alert type="error">{error.message}</Alert>
                    }
                </div>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button className='v-text' onClick={onClose}>
                    Annuler
                </Button>
                <Button className='v-primary' onClick={() => onValidate()}>
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    )
}