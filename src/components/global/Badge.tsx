import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    value?: string | number;
}

const Badge = (props: Props) => {
    const { value = 0, className, ...others } = props
    return (
        <div className={className ? `av-badge ${className}` : 'av-badge'} {...others}>
            {value}
        </div>
    )
}

export default Badge;