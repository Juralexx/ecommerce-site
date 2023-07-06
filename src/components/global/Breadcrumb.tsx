"use client"

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './icons/Icon';

function titleize(str: string) {
    let dashesToSpace = str.replace(/-/g, ' ')
    return dashesToSpace.charAt(0).toUpperCase() + dashesToSpace.slice(1)
}

function Crumb({ text, href, last = false }: any) {
    if (last) {
        return <li>{text}</li>
    } else {
        return (
            <li>
                <Link href={href} passHref>
                    {text}
                </Link><Icon name="CaretRight" />
            </li>
        )
    }
}

export default function Breadcrumb(props: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const isBrowser = typeof window !== "undefined";
    const [current, setCurrent] = React.useState('')

    React.useEffect(() => {
        if (isBrowser) {
            let title = document.title?.split(' - ')[0]
            if (title)
                setCurrent(title)
            else setCurrent(document.title)
        }
    }, [isBrowser])

    function generateBreadcrumbs() {
        const asPathWithoutQuery = pathname.split("?")[0]

        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter((v: string) => v.length > 0)

        const nestedRoutes = asPathNestedRoutes.filter((route: string) => !route.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/))

        const crumblist = nestedRoutes.slice(0, -1).map((subpath: string, key: number) => {
            const href = "/" + nestedRoutes.slice(0, key + 1).join("/")

            return { href, text: titleize(subpath) }
        })

        return [{ href: "/", text: 'Accueil' }, ...crumblist, { href: "/" + nestedRoutes, text: current }]
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <div className={props.className ? `av-breadcrumb ${props.className}` : 'av-breadcrumb'} aria-label="breadcrumb" role="breadcrumb" {...props}>
            <div className='av-crumb'>
                {breadcrumbs.map((crumb, key) => (
                    <Crumb {...crumb} key={key} last={key === breadcrumbs.length - 1} />
                ))}
            </div>
        </div>
    );
}