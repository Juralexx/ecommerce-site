import Icon from './icons/Icon';
import React from 'react'

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'un' + classe
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isError?:boolean;
    isSuccess?: boolean;
    onClean?: () => void;
}

const Input = (props: Props) => {
    const { style, className, icon, endIcon, isError = false, isSuccess = false, onClean, onClick, ...others } = props;

    return (
        <div className={className ? `av-input input-component ${className}` : "av-input input-component"} onClick={onClick} style={style}>
            {props.name &&
                <label className={`${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                    {props.name}
                </label>
            }
            <div className={`av-input-container input-container ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                {icon &&
                    <div className='start-icon'>
                        {icon}
                    </div>
                }
                <input {...others}/>

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

export default Input;