import Icon from './icons/Icon';
import React from 'react'

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'un' + classe
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isError?: boolean;
    isSuccess?: boolean;
    onClean?: () => void;
    onChange?: (...args: any) => void;
}

const NumberInput = (props: Props) => {
    const { style, className, icon, endIcon, isError = false, isSuccess = false, onClean, onClick, onChange = () => { }, ...others } = props;

    const inputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

    return (
        <div className={className ? `av-input input-component ${className}` : "av-input input-component"} onClick={onClick} style={style}>
            {props.name &&
                <label className={`${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                    {props.name}
                </label>
            }
            <div className={`av-number-input-container input-container ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                {icon &&
                    <div className='start-icon'>
                        {icon}
                    </div>
                }
                <input
                    ref={inputRef}
                    type="number"
                    {...others}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                />
                <div className='end-icons'>
                    <Icon name="Minus" onClick={() => {
                        inputRef.current?.stepDown();
                        onChange(inputRef.current?.value)
                    }} />
                    <Icon name="Plus" onClick={() => {
                        inputRef.current?.stepUp();
                        onChange(inputRef.current?.value)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NumberInput;