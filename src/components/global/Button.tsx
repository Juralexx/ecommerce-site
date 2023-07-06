import Link from 'next/link'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    href?: string;
    icon?: any;
    endIcon?: any;
}

const Button = (props: Props) => {
    const { children, icon, endIcon, href, className, ...others } = props;

    return (
        <button className={className ? `av-btn ${className}` : 'av-btn'} {...others}>
            {!href ? (
                <React.Fragment>
                    {icon}
                    {children}
                    {endIcon}
                </React.Fragment>
            ) : (
                <Link href={href}>
                    {icon}
                    {children}
                    {endIcon}
                </Link>
            )}
        </button>
    )
}

export default Button;