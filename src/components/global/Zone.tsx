import React from 'react'

interface Props {
    children?: React.ReactNode;
    [key: string]: any;
}

const Zone = (props: Props) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-zone ${className}` : 'av-zone'} {...others}>
            {children}
        </div>
    )
}

export default Zone;