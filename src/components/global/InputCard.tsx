import React from 'react'
import Icon from './icons/Icon';

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'xyz'
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isError?:boolean;
    isSuccess?: boolean;
    onClean?: () => void;
}

const InputCard = (props: Props) => {
    const { style, className, icon, endIcon, isError = false, isSuccess = false, onClean, onClick, ...others } = props;

    return (
        <div className={className ? `av-input-card input-component ${className} ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}` : `av-input-card input-component ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`} onClick={onClick} style={style}>
            {props.name &&
                <label className={`${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                    {props.name}
                </label>
            }
            <div className='av-input-card-container input-container'>
                {icon &&
                    <div className='start-icon'>
                        {icon}
                    </div>
                }
                <input
                    {...others}
                />
                {(endIcon || (onClean && props.value)) &&
                    <div className='end-icon' onClick={event => { onClean && onClean(); event.stopPropagation() }}>
                        {onClean && props.value ? (
                            <Icon name="Cross" />
                        ) : (
                            endIcon ? endIcon : <></>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default InputCard;