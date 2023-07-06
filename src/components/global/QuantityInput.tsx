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

const QuantityInput = (props: Props) => {
    const { style, className, icon, endIcon, isError = false, isSuccess = false, onClean, onClick, onChange = () => { }, ...others } = props;

    const inputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null)

    return (
        <div className={className ? `av-quantity-input quantity-input ${className}` : "av-quantity-input quantity-input"} onClick={onClick} style={style}>
            <div className={`av-quantity-input-container input-container ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                <div className='start-icon'>
                    <Icon name="Plus" onClick={() => {
                        inputRef.current?.stepUp();
                        onChange(Number(inputRef.current?.value))
                    }} />
                </div>
                <input
                    ref={inputRef}
                    type="number"
                    {...others}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
                />
                <div className='end-icon'>
                    <Icon name="Minus" onClick={() => {
                        inputRef.current?.stepDown();
                        onChange(Number(inputRef.current?.value))
                    }} />
                </div>
            </div>
        </div>
    )
}

export default QuantityInput;