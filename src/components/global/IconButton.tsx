import Link from 'next/link'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    href?: string;
}

const IconButton = (props: Props) => {
    const { children, className, icon, href, ...others } = props
    return (
        <div className={className ? `av-icon-btn ${className}` : 'av-icon-btn'} {...others}>
            {!href ? (
                <>
                    {icon}
                    {children}
                </>
            ) : (
                <Link href={href}>
                    {icon}
                    {children}
                </Link>
            )}
        </div>
    )
}

export default IconButton;