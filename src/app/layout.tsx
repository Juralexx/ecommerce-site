import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import "../styles/variables.colors.css";
import "../styles/variables.config.css";
import "../styles/css/cols.css";
import "../styles/css/container.css";
import "../styles/css/globals.css";
import "../styles/css/tail.css";
import "../styles/css/styles.css";
import "../styles/css/classes.css";
import "../styles/css/lightbox.css";
import "../styles/css/quill.editor.css";
import StyledComponentsRegistry from '@/lib/styled-components';
import BannerTop from '@/layouts/BannerTop';
import Navbar from '../layouts/Navbar';
import Footer from '@/layouts/Footer';
import { getNavigation } from '@/api/navigation';
import { getPromotions } from '@/api/promotions';
import CartContextProvider from '@/contexts/CartContext';
import CartPopupContextProvider from '@/contexts/cart-popup/CartPopupContext';
import CartPopup from '@/layouts/CartPopup';
import { Promotion } from '@/types';

const inter = Inter({ subsets: ['latin'] })

interface Props {
    children: React.ReactNode;
}

/**
 * Generate the root metadatas
 */

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Accueil - Le Jardin des Agrumes',
        generator: "Le Jardin des Agrumes",
        applicationName: "Le Jardin des Agrumes",
        authors: [{ name: 'Alexandre Vurbier' }, { name: 'Alexandre Vurbier', url: 'https://alexandrevurbier.com/' }],
        creator: 'Alexandre Vurbier',
        publisher: 'Le Jardin des Agrumes',
        metadataBase: new URL(process.env.FRONT_URL || ''),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
                'fr-FR': '/fr-FR',
            },
        },
        openGraph: {
            title: 'Le Jardin des Agrumes',
            description: 'Le Jardin des Agrumes - Site e-commerce',
            url: process.env.FRONT_URL,
            siteName: 'Le Jardin des Agrumes',
            images: [
                {
                    url: `${process.env.FRONT_URL}/og.png`,
                    width: 800,
                    height: 600,
                }
            ],
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Le Jardin des Agrumes',
            description: 'Le Jardin des Agrumes - Site e-commerce',
            creator: '',
            images: [`${process.env.FRONT_URL}/og.png`],
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/logo.png',
            shortcut: '/logo.png',
            apple: '/logo.png',
            other: {
                rel: '/logo',
                url: '/logo.png',
            },
        }
    };
}

/**
 * Check if a promotion is active
 * @param start Date start
 * @param end Date end
 */

function isPromotionActive(start: string | Date, end: string | Date): boolean {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    if (now < startDate)
        return false;
    else if (endDate && now > endDate)
        return false;
    else if (now > startDate && (endDate && now < endDate))
        return true;
    else if (now > startDate && !endDate)
        return true;
    else return false;
};

function getActivePromotions(promotions: Promotion.Options[]) {
    let activePromotions: Promotion.Options[] = [];
    promotions.forEach(promotion => {
        const isActive = isPromotionActive(promotion.start_date, promotion.end_date);
        if (isActive) {
            activePromotions = [...activePromotions, promotion];
        }
    })
    return activePromotions;
};

export default async function RootLayout({ children }: Props) {
    //Fetch navbar links
    const { navigation } = await getNavigation();
    //Fetch all promotions
    const { promotions } = await getPromotions();
    //Get only active promotions
    const activePromotions = getActivePromotions(promotions);

    return (
        <html lang="fr">
            <body className={inter.className}>
                <Script src="/././js/tarteaucitron/tarteaucitronjs/tarteaucitron.js" strategy="beforeInteractive" />
                <Script src="/././js/tarteaucitron/tarteaucitron.parameters.js" strategy="beforeInteractive" />
                <Script src="/././js/tarteaucitron/google-analytics.js" strategy="beforeInteractive" />
                <StyledComponentsRegistry>
                    <CartContextProvider>
                        <CartPopupContextProvider>
                            <CartPopup />
                            <main>
                                {activePromotions.length > 0 &&
                                    <BannerTop
                                        promotions={activePromotions}
                                    />
                                }
                                <Navbar
                                    datas={navigation}
                                    isPromotions={activePromotions.length > 0}
                                />
                                {children}
                            </main>
                        </CartPopupContextProvider>
                    </CartContextProvider>
                    <Footer
                        datas={navigation}
                    />
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}