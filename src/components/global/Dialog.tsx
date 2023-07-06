import React from 'react'
import useClickOutside from './hooks/useClickOutside'
import IconButton from './IconButton'
import Icon from './icons/Icon';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
    mobileFull?: boolean;
    tabletFull?: boolean;
}

export const Dialog = (props: Props) => {
    const { children, open, onClose = () => { }, mobileFull = false, tabletFull = false, ...others } = props;
    const wrapper: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
    useClickOutside(wrapper, () => { if (open) onClose() });

    const dialogClass = mobileFull ? 'av-dialog mobilefull' : (tabletFull ? 'av-dialog tabletfull' : 'av-dialog');

    return (
        <div className={open ? 'av-dialog-wrapper open' : 'av-dialog-wrapper closed'}>
            <div className='av-dialog-backdrop' />
            <div className='av-dialog-container'>
                <div className={dialogClass} ref={wrapper} {...others}>
                    {children}
                    <div className='av-dialog-close'>
                        <IconButton className='v-text small' onClick={() => onClose()}>
                            <Icon name="Cross" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DialogTitle = (props: React.HTMLAttributes<HTMLElement>) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-dialog-title ${className}` : 'av-dialog-title'} {...others}>
            {children}
        </div>
    )
}

export const DialogContent = (props: React.HTMLAttributes<HTMLElement>) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-dialog-content ${className}` : 'av-dialog-content'} {...others}>
            {children}
        </div>
    )
}

export const DialogActions = (props: React.HTMLAttributes<HTMLElement>) => {
    const { children, className, ...others } = props
    return (
        <div className={className ? `av-dialog-actions ${className}` : 'av-dialog-actions'} {...others}>
            {children}
        </div>
    )
}