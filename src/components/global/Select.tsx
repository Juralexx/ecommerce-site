import React from 'react'
import Input from './Input'
import Icon from './icons/Icon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Select = (props: Props) => {
    const { style, children, className, ...others } = props;

    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className={className ? `av-selection ${className}` : "av-selection"} onClick={() => setOpen(!open)}>
            <Input
                {...others}
                endIcon={<Icon name="CaretDown" />}
            />
            <div className={`av-selection-container ${open ? 'open' : 'closed'}`}>
                <div className='av-selection-list'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Select;