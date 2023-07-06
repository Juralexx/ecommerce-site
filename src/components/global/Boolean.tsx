import React from 'react'

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'un' + classe
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    name?: string;
    leftValue?: string | number;
    rightValue?: string | number;
    leftActive?: boolean;
    rightActive?: boolean;
}

const Boolean = (props: Props) => {
    const { name, leftValue, rightValue, leftActive = false, rightActive = true, ...others } = props
    return (
        <div className={props.className ? `av-boolean ${props.className}` : 'av-boolean'} {...others}>
            {name &&
                <label>{name}</label>
            }
            <label htmlFor='boolean'>
                <div className='av-boolean-container'>
                    <div className={`av-boolean-button false ${addClass(leftActive, 'active')}`}>
                        {leftValue ? leftValue : 'Faux'}
                    </div>
                    <div className={`av-boolean-button true ${addClass(rightActive, 'active')}`}>
                        {rightValue ? rightValue : 'Vrai'}
                    </div>
                    <input id="boolean" type="check" aria-disabled="false" aria-required="false" checked={false} />
                </div>
            </label>
        </div>
    )
}

export default Boolean;