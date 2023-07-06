import React from 'react'

const Divider = (props: React.HTMLAttributes<HTMLElement>) => {
    const { className, ...others } = props

    return (
        <div className={className ? `av-divider ${className}` : 'av-divider'} {...others} />
    )
}

export default Divider;