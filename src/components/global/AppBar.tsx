import React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

const AppBar = (props: Props) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-appbar ${className}` : 'av-appbar'} {...others}>
            <div className='av-toolbar'>
                {children}
            </div>
        </div>
    )
}

export default AppBar;