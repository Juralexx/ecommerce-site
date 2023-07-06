import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    uniqueKey?: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<any>;
}

const Checkbox = (props: Props) => {
    const { uniqueKey, checked, onChange = () => { }, ...others } = props
    return (
        <div className='av-checkbox' key={uniqueKey} {...others}>
            <input id={uniqueKey} name={uniqueKey} type="checkbox" checked={checked} onChange={onChange} />
            <label htmlFor={uniqueKey}>
                <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                </span>
            </label>
        </div>
    )
}

export default Checkbox;