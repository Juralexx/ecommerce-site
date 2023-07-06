"use client"

import React from 'react'
import { Address, Customer } from '@/types'
import { Button } from '@/components/global';
import useError from '@/functions/useError';
import { updateCustomer } from '@/api/customers';
import { useRouter } from 'next/navigation';
import Icon from '@/components/global/icons/Icon';
import AddressDialog from '@/components/AddressDialog';

interface Props {
    user: Customer.Options;
}

export default function UserAddresses({ user }: Props) {
    //NextJS router
    const router = useRouter();
    //User object extended with passwords
    const [datas] = React.useState<Customer.Options>({ ...user })
    //Object to handle new address
    //- open: boolean to handle model open state
    //- address: address object to update
    const [addAddress, setAddAddress] = React.useState<{ open: boolean, address: Address.Options }>({ open: false, address: Address.defaultProps });
    //Object to handle address update
    //- open: boolean to handle model open state
    //- address: address object to update
    //- key: address object key in address array (used to update it in the new addresses array sent to the server to update user document)
    const [updateAddress, setUpdateAddress] = React.useState<{ open: boolean, address: Address.Options, key: number }>({ open: false, address: Address.defaultProps, key: -1 });
    //Error hook
    const { error, setError } = useError();

    /**
     * Handle user informations update
     * @param addresses Addresses array to sent to the server to update user document
     */

    const updateCustomerAddresses = async (adresses: Address.Options[]) => {
        //Default updatable datas passed to the server
        let config: Partial<Customer.Options> = { addresses: adresses };
        //Update customer function passed to the server
        const { errors } = await updateCustomer(user, config);
        //If the server return an error, return the error
        if (errors.message) {
            setError(errors);
        } else {
            //Else reload the page the display new informations
            router.replace(`/user/addresses`);
        }
    }

    return (
        <div className='adresses-page'>
            <div className='p-7 bordered bg-white boxshadow-lg-colored rounded-xl'>
                <div className='text-xl font-semibold mb-4'>
                    Mes adresses
                </div>
                {user.addresses.length === 0 ? (
                    <p className='mb-6'>
                        Vous trouverez ici vos adresses de facturation et de livraison.
                        Les mettre à jour vous permet un gain de temps au moment de vos achats.
                    </p>
                ) : (
                    <div className='grid grid-cols-2 gap-2 mb-6'>
                        {user.addresses.map((address, i) => {
                            return (
                                <div className='p-5 bordered rounded-xl' key={i}>
                                    <p className='font-semibold mb-3'>{address.name} {address.lastname}</p>
                                    {address.society &&
                                        <p>{address.society}</p>
                                    }
                                    <p>{address.street}</p>
                                    {address.complement &&
                                        <p>{address.complement}</p>
                                    }
                                    <p>{address.postcode} {address.city}</p>
                                    <p>{address.phone}</p>
                                    <div className='flex justify-end gap-x-2 mt-4'>
                                        <Button className='v-outline no-padding' onClick={() => setUpdateAddress({ open: true, address: address, key: i })}>
                                            <Icon name="Edit" /> Modifier
                                        </Button>
                                        <Button className='v-classic no-padding flex-shrink-0'>
                                            <Icon name="Trash" /> Supprimer
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                <Button className='v-primary' onClick={() => setAddAddress(prev => ({ ...prev, open: true }))}>
                    Ajouter une adresse
                </Button>
            </div>
            {/* Add a new address */}
            {AddressDialog({
                open: addAddress.open,
                title: "Ajouter une adresse",
                state: addAddress,
                setState: setAddAddress,
                onValidate: async () => {
                    //Pass the existing addresses and the new address from 'addAddress.address'
                    await updateCustomerAddresses([...datas.addresses, addAddress.address])
                    setAddAddress(prev => ({ ...prev, open: false }))
                },
                onClose: () => setAddAddress(prev => ({ ...prev, open: false })),
                error: error
            })}
            {/* Update existing address */}
            {AddressDialog({
                open: updateAddress.open,
                title: "Modifier mon adresse",
                state: updateAddress,
                setState: setUpdateAddress,
                onValidate: async () => {
                    //Deep originales addresses array duplication
                    let addresses = [...datas.addresses];
                    //Replace the existing address with the updated address in the array
                    addresses[updateAddress.key] = updateAddress.address;
                    //Pass the new array with the updated address
                    await updateCustomerAddresses([...addresses])
                    setUpdateAddress({ open: false, address: Address.defaultProps, key: -1 })
                },
                onClose: () => setUpdateAddress({ open: false, address: Address.defaultProps, key: -1 }),
                error: error
            })}
        </div>
    )
}