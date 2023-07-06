import Link from 'next/link';
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    steps: {
        icon: React.ReactNode | string | number;
        text: string;
        href?: string;
        disabled?: boolean;
        active?: boolean;
        checked?: boolean;
    }[]
}

const Stepper = (props: Props) => {
    const { children, className, steps, ...others } = props;

    return (
        <div className={className ? `av-stepper ${className}` : 'av-stepper'} {...others}>
            {steps.map((step, i) => {
                return (
                    <div className={`av-stepper-item ${step.active ? 'active' : 'unactive'} ${step.checked ? 'checked' : 'unchecked'} ${step.disabled ? 'disabled' : 'enabled'}`} key={i}>
                        {(step.href && !step.disabled) ? (
                            <Link href={step.href} className='av-stepper-item-inner'>
                                <div className='av-stepper-item-icon'>
                                    {step.icon}
                                </div>
                                <div className='av-stepper-item-text'>
                                    {step.text}
                                </div>
                            </Link>
                        ) : (
                            <div className='av-stepper-item-inner'>
                                <div className='av-stepper-item-icon'>
                                    {step.icon}
                                </div>
                                <div className='av-stepper-item-text'>
                                    {step.text}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Stepper;