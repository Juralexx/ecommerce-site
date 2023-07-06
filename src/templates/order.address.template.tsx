"use client"

import React from 'react'
import { Address, Customer } from '@/types'
import useError from '@/functions/useError';
import { updateCustomer } from '@/api/customers';
import { usePathname, useRouter } from 'next/navigation';
import AddressDialog from '@/components/AddressDialog';
import { Button, SelectCard } from '@/components/global';
import Icon from '@/components/global/icons/Icon';

interface Props {
    user: Customer.Options;
    deliveryAddress: Address.Options | null;
    billingAddress: Address.Options | null;
    onDeliveryAddressSelection: (...args: any) => void;
    onBillingAddressSelection: (...args: any) => void;
}

export default function OrderAddressTemplate(props: Props) {
    const { user, deliveryAddress, billingAddress, onDeliveryAddressSelection, onBillingAddressSelection } = props;
    //NextJS router
    const router = useRouter();
    const pathname = usePathname();
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
            return router.replace(pathname);
        }
    }

    return (
        <React.Fragment>
            <div className='p-7 bordered bg-white boxshadow-lg-colored rounded-xl'>
                <div className='flex xs:flex-col min-xs:items-center justify-between mb-4'>
                    <h2 className='mb-0 mr-8'>
                        Adresse de livraison
                    </h2>
                    <Button className='v-primary xs:!mt-8' onClick={() => setAddAddress(prev => ({ ...prev, open: true }))}>
                        <Icon name="Plus" className="start-icon" /> Ajouter une adresse
                    </Button>
                </div>
                {user.addresses.length === 0 ? (
                    <p className='mb-6'>
                        Vous n'avez actuellement aucune adresse de livraison d'enregistrer. Ajouter une nouvelle adresse pour valider votre commande.
                    </p>
                ) : (
                    <div className='grid xs:!grid-cols-1 sm:!grid-cols-2 grid-cols-3 gap-2 mb-6'>
                        {user.addresses.map((address, i) => {
                            return (
                                <SelectCard
                                    key={i}
                                    title={`${address.name} ${address.lastname}`}
                                    onClick={() => onDeliveryAddressSelection(address)}
                                    checked={(deliveryAddress && deliveryAddress.street === address.street && deliveryAddress.city === address.city) || false}
                                >
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
                                            Modifier
                                        </Button>
                                        <Button className='v-classic no-padding flex-shrink-0'>
                                            Supprimer
                                        </Button>
                                    </div>
                                </SelectCard>
                            )
                        })}
                    </div>
                )}
                <h2 className='mt-12'>
                    Adresse de facturation
                </h2>
                {user.addresses.length === 0 ? (
                    <p className='mb-6'>
                        Vous n'avez actuellement aucune adresse de facturation d'enregistrer. Ajouter une nouvelle adresse pour valider votre commande.
                    </p>
                ) : (
                    <div className='grid xs:!grid-cols-1 sm:!grid-cols-2 grid-cols-3 gap-2 mb-6'>
                        {user.addresses.map((address, i) => {
                            return (
                                <SelectCard
                                    key={i}
                                    title={`${address.name} ${address.lastname}`}
                                    onClick={() => onBillingAddressSelection(address)}
                                    checked={(billingAddress && billingAddress.street === address.street && billingAddress.city === address.city) || false}
                                >
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
                                            Modifier
                                        </Button>
                                        <Button className='v-classic no-padding flex-shrink-0'>
                                            Supprimer
                                        </Button>
                                    </div>
                                </SelectCard>
                            )
                        })}
                    </div>
                )}
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
        </React.Fragment>
    )
}