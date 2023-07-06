"use client"

import React from 'react'
import { Customer } from '@/types'
import Link from 'next/link';
import { logout } from '@/api/auth';
import { addActive } from '@/functions/utils';
import { usePathname } from 'next/navigation';
import Icon from '@/components/global/icons/Icon';
import { Button } from '@/components/global';

interface Props {
    user: Customer.Options;
    children?: React.ReactNode;
}

export default function UserTemplate({ user, children }: Props) {
    const pathname = usePathname();
    //Boolean to handle notice expension
    const [notice, setNotice] = React.useState<boolean>(false);

    return (
        <div className="relative flex flex-row md:flex-col gap-x-8 md:gap-y-8 md:pt-96">
            <div className="flex flex-col top-0 flex-[1 0 0] order-1 md:order-2">
                <div className='av-menu-card'>
                    <div className='av-menu-title'>
                        <h2 className='m-0'>{user.name ? `Bonjour ${user.name} !` : 'Bonjour utilisateur !'}</h2>
                        <p className='mt-2'>Bienvenue dans votre espace</p>
                    </div>
                    <div className="av-menu-list">
                        <Link href='/user/informations' className={addActive(pathname === '/user/informations')}>
                            Mes informations
                        </Link>
                        <Link href='/user/orders' className={addActive(pathname === '/user/orders')}>
                            Mes commandes
                        </Link>
                        <Link href='/user/addresses' className={addActive(pathname === '/user/addresses')}>
                            Mes adresses
                        </Link>
                        <div className='cursor-pointer' onClick={() => logout()}>
                            Déconnexion
                        </div>
                    </div>
                </div>
                <div className='flex flex-col relative w-[320px] p-7 mt-6 bg-slate-100 rounded-xl md:w-full'>
                    <h3 className='text-center font-semibold'>Besoin de nous contacter ?</h3>
                    <p className='text-center'>Si vous ne trouvez pas de réponses à vos questions dans notre FAQ n'hésitez pas à contacter notre équipe du service client.</p>
                    <div className='p-5 bordered bg-white boxshadow-lg-colored rounded-xl mt-6'>
                        <div className='flex mb-4'>
                            <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-slate-100'>
                                <Icon name="Mail" />
                            </div>
                            <div className='ml-4'>
                                <p className='text-xl font-semibold mb-1'>Nous écrire</p>
                                <p>Obtenez une réponse complète et sur-mesure délivrée par un spécialiste.</p>
                            </div>
                        </div>
                        <Button className='v-primary fullwidth'>
                            Contactez-nous
                        </Button>
                    </div>
                    <div className='p-5 bordered bg-white boxshadow-lg-colored rounded-xl mt-6'>
                        <div className='flex mb-4'>
                            <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-slate-100'>
                                <Icon name="Phone" />
                            </div>
                            <div className='ml-4'>
                                <p className='text-xl font-semibold mb-1'>Nous appeler</p>
                                <p>Obtenez une réponse rapide en cas de problème ou de question urgente.</p>
                            </div>
                        </div>
                        <Button className='v-primary fullwidth'>
                            03 00 00 00 00
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full order-2 md:order-1'>
                {children}
                {pathname === '/user/informations' || pathname === 'user/addresses' &&
                    <>
                        <div className={`relative w-full mt-12 p-5 transition-all ${notice ? 'max-h-unset' : 'max-h-72 overflow-hidden before:absolute before:bottom-0 before:left-0 before:w-full before:h-24 before:bg-gradient-to-t before:from-white before:to-transparent'}`}>
                            <h3 className='font-semibold mb-6'>Notice relative à la collecte de données</h3>
                            <p className='mb-4 leading-7'>
                                Les données à caractère personnel recueillies par le biais du présent formulaire font l'objet d'un traitement
                                informatique dont le responsable est la société <strong>[[DÉNOMINATION]]</strong> - RCS <strong>[[VILLE RCS]]</strong> n° <strong>[[N° RCS]]</strong>.
                            </p>
                            <p className='mb-4 leading-7'>
                                Les données personnelles collectées sont obligatoires pour nous permettre de créer votre compte client.
                                À défaut, le compte ne pourrait pas être créé.
                            </p>
                            <p className='mb-4 leading-7'>
                                <strong>[[DÉNOMINATION]]</strong> et l'ensemble des destinataires en charge de l'exécution du traitement conservent vos données
                                à caractère personnel pour la durée strictement nécessaire à l'accomplissement des finalités visées par la présente collecte.
                            </p>
                            <p className='mb-4 leading-7'>
                                Au titre du Règlement (UE) 2016/679 sur la protection des données (« RGPD ») et de la Loi n°78-17 du 6 janvier 1978
                                relative à l'informatique, aux fichiers et aux libertés modifiés, vous disposez d'un droit d'accès, de rectification,
                                à la portabilité, ou d'effacement de vos données, ainsi que du droit à la limitation et d'opposition au traitement.
                                Par ailleurs, vous disposez du droit de retirer votre consentement à tout moment.
                            </p>
                            <p className='mb-4 leading-7'>
                                Pour toute demande, vous pouvez nous écrire à : <strong>[[DÉNOMINATION]]</strong> - Service Client - <strong>[[ADRESSE ENTREPRISE]]</strong>,
                                soit sur le site <strong>[[NOM DU DOMAINE]]</strong> dans la rubrique Contactez-nous/Gestion des données personnelles,
                                soit par e-mail à l'adresse suivante : <strong>[[ADRESSE MAIL CONTACT]]</strong>. Vous disposez également du droit d'introduire
                                une réclamation auprès de l'autorité de contrôle (la CNIL).
                            </p>
                        </div>
                        <div className='flex justify-center'>
                            <Button className='v-text' onClick={() => setNotice(!notice)}>
                                {notice ? 'Voir moins' : 'Voir plus'}
                            </Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}