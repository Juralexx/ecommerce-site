import React from 'react'
import Radio from './Radio';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    title?: string;
    checked?: boolean;
}

const SelectCard = (props: Props) => {
    const { children, title, checked, className, ...others } = props
    return (
        <div className={`${className ? `av-selection-card ${className}` : "av-selection-card"} ${checked ? 'active' : 'unactive'}`} {...others}>
            <Radio checked={checked} />
            {title &&
                <div className='card-title'>{title}</div>
            }
            {children}
        </div>
    )
}

export default SelectCard;