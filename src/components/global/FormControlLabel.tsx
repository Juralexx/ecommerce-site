import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    control: React.ReactNode;
}

const FormControlLabel = (props: Props) => {
    const { children, control, ...others } = props
    return (
        <div className='av-form-label' {...others}>
            <div className='av-checkbox-container'>
                {props.control}
            </div>
            <div className='av-labeltext-container'>
                {props.children}
            </div>
        </div>
    )
}

export default FormControlLabel;