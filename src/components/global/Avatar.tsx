import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Avatar = (props: Props) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-avatar ${className}` : 'av-avatar'} {...others}>
            {children}
        </div>
    )
}

export default Avatar;