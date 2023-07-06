import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

export const Card = (props: CardProps) => {
    const { children, className, ...others } = props

    return (
        <div className={className ? `av-card ${className}` : 'av-card'} {...others}>
            {children}
        </div>
    )
}

interface CardHeaderProps extends CardProps {
    avatar?: React.ReactNode;
    uptitle?: string;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export const CardHeader = (props: CardHeaderProps) => {
    const { children, className, avatar, uptitle, title, subtitle, action, ...others } = props

    return (
        <div className={className ? `av-card-header ${className}` : 'av-card-header'} {...others}>
            {avatar &&
                <div className='av-card-header-avatar'>
                    {avatar}
                </div>
            }
            {(title || subtitle || uptitle) &&
                <div className='av-card-header-content'>
                    {uptitle &&
                        <div className='uptitle'>
                            {uptitle}
                        </div>
                    }
                    {title &&
                        <div className='title'>
                            {title}
                        </div>
                    }
                    {subtitle &&
                        <div className='subtitle'>
                            {subtitle}
                        </div>
                    }
                </div>
            }
            {action &&
                <div className='av-card-header-action'>
                    <div className='action'>
                        {action}
                    </div>
                </div>
            }
            {children}
        </div>
    )
}

interface CardContentProps extends CardProps {}

export const CardContent = (props: CardContentProps) => {
    const { children, className, ...others } = props

    return (
        <div className={className ? `av-card-content ${className}` : 'av-card-content'} {...others}>
            {children}
        </div>
    )
}