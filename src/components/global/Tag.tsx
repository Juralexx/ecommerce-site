import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    name?: string;
}

const Tag = (props: Props) => {
    const { children, name, className, ...others } = props
    return (
        <div className={className ? `av-tag ${className}` : "av-tag"} {...others}>
            {name}
            {children}
        </div>
    )
}

export default Tag;