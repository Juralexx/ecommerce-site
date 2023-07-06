"use client"

import React from 'react'
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useClickOutside from '@/components/global/hooks/useClickOutside';
import { addActive, addClass } from '@/functions/utils';
import { IconButton, Input, NavbarToggle } from '@/components/global';
import Icon from '@/components/global/icons/Icon';
import CartSidebar from './CartSidebar';

interface Props {
    datas: Record<string, any>;
    isPromotions: boolean;
}

export default function Navbar({ datas, isPromotions }: Props) {
    //Get the current pathname
    const pathname = usePathname();
    //Variable containing the 'open' boolean for the mobile navbar and the current submenu key active
    const [navbar, setNavbar] = React.useState<{ open: boolean, submenu: number | null }>({ open: false, submenu: null });

    //Define a Reference to be able to close the sidebar on click outside
    const navref: React.MutableRefObject<HTMLElement | null> = React.useRef(null);
    useClickOutside(navref, () => setNavbar({ open: false, submenu: null }));

    //Boolean used to verify is the navbar is at the top of the page or if the user has scrolled
    const [scrolledToTop, setScrolledToTop] = React.useState<boolean>(true);

    //Hook the handle the scroll action and change the 'scrolledToTop' variable
    React.useEffect(() => {
        const handleScroll = () => setScrolledToTop(window.pageYOffset < 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    /**
     * Check if a submenu is active or not
     * @param tabs Submenu names and links
     * @param key Submenu key
     */
    const isSubmenuActive = (tabs: Record<string, any>, key: number) => {
        //Map all the tabs to keep only the paths in the array
        const tabsUrls = tabs.map((tab: Record<string, any>) => { return tab.url });
        //If the previous array includes the current pathname or the submenu property
        //in the navbar variable is the current key, the submenu is active
        if (tabsUrls.includes(pathname) || navbar.submenu === key) {
            return 'active';
        } else return;
    };

    /**
     * Searchbar handlers
     */

    //Variable to handle searchbar input value
    const [search, setSearch] = React.useState<string>('');
    //Get the searchParams
    const searchParams = useSearchParams();
    //Router to redirect to the '/search' page
    const router = useRouter();

    //Hook to pass to 'q' parameter value from to url to the searchbar input on reload
    React.useEffect(() => {
        //Get the 'q' param value
        const q = searchParams.get('q');
        //If the 'q' param exists
        //Passe its value to the search variable
        if (q) {
            setSearch(q)
        };
    }, [searchParams])

    /**
     * Launch to search and redirect to the '/search' page
     */

    function launchSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        //If the key pressed is 'enter'
        if (event.key === 'Enter') {
            //If the searchbar is not empty
            if (event.currentTarget.value.length > 0) {
                //Redirect to the search page and passe the 'q' query param to the URL
                router.replace(`/search?q=${event.currentTarget.value}`)
            }
        }
    }

    return (
        <header
            className={`av-navbar ${addActive(navbar.open)} ${isPromotions ? 'top-[40px]' : 'top-0'} ${scrolledToTop ? 'min-md:p-6' : 'min-md:py-2 min-md:px-6'}`}
            id='navbar'
        >
            <nav ref={navref}>
                <ul className={`top-nav-container ${addActive(navbar.open)}`}>
                    <div className="navbar-logo">
                        <Link href="/">
                            <img className="logo" src="/logo.png" alt="" />
                        </Link>
                    </div>
                    <Input
                        placeholder='Rechercher...'
                        icon={<Icon name="Search" />}
                        value={search}
                        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setSearch(value)}
                        onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => launchSearch(event)}
                        onClean={() => setSearch('')}
                    />
                    <div className='icon-container'>
                        <CartSidebar />
                        <IconButton href='/user/informations' className='v-default is-link'>
                            <Icon name="User" />
                        </IconButton>
                        <NavbarToggle
                            open={navbar.open}
                            onClick={() => setNavbar(prev => ({ ...prev, open: !prev.open }))}
                        />
                    </div>
                </ul>

                <ul className={`nav-container ${addActive(navbar.open)} sub-${addClass(navbar.submenu !== null, 'active')}`}>
                    {datas?.navigation &&
                        datas.navigation.map((tab: any, key: any) => {
                            return (
                                !tab.links || tab.links.length === 0 ? (
                                    <li key={key} onClick={() => setNavbar({ open: false, submenu: null })}>
                                        <Link passHref
                                            href={tab.link}
                                            className={`navlink ${addActive(pathname === tab.link)}`}
                                            target={tab?.target || '_self'}
                                        >
                                            {tab.name}
                                        </Link>
                                    </li>
                                ) : (
                                    <li className='menu-small-displayer' key={key}>
                                        <button
                                            className={`navlink ${isSubmenuActive(tab.links, key)}`}
                                            onClick={() => setNavbar(prev => ({ ...prev, submenu: prev.submenu !== key ? key : null }))}
                                        >
                                            {tab.name}<Icon name="CaretDown" />
                                        </button>
                                        <div className={`av-nav-submenu submenu ${addClass(navbar.submenu === key, 'open')}`}>
                                            <div className='menu-small-title'>
                                                <Icon name="ArrowLeft" onClick={() => setNavbar(prev => ({ ...prev, submenu: null }))} /> {tab.name}
                                            </div>
                                            <div className='menu-small-inner'>
                                                {tab.links.map((subtab: { link: string, name: string }, i: number) => {
                                                    return (
                                                        <Link href={subtab.link}
                                                            passHref
                                                            target={tab?.target || '_self'}
                                                            className={`submenu-link ${addActive(pathname === subtab.link)}`}
                                                            onClick={() => setNavbar({ open: false, submenu: null })}
                                                            key={i}
                                                        >
                                                            {subtab.name}
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                )
                            )
                        })}
                </ul>
            </nav>
        </header>
    )
}