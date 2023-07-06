import React from 'react'
import styled from 'styled-components'
import Icon from './icons/Icon';

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'un' + classe
}

const Input = (props: any) => {
    const { style, icon, endIcon, isError, isSuccess, onClean, ...others } = props

    return (
        <Container style={style}>
            {props.name &&
                <label className={`${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                    {props.name}
                </label>
            }
            <InputContainer className={`input-container ${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                {icon &&
                    <div className='start-icon'>
                        {icon}
                    </div>
                }
                <input
                    {...others}
                />
                {endIcon &&
                    <div className='end-icon' onClick={(e) => { onClean && onClean(); e.stopPropagation() }}>
                        {onClean && props.value.length > 0 ? (
                            <Icon name="Cross" />
                        ) : (
                            endIcon
                        )}
                    </div>
                }
            </InputContainer>
        </Container>
    )
}

export default Input

const Container = styled.div`
    label {
        display        : block;
        font-weight    : 400;
        font-size      : 1rem;
        line-height    : 1.5;
        letter-spacing : 0.00938em;
        margin-left    : 4px;
        margin-bottom  : 8px;
        color          : var(--text);

        &.error {
            color : var(--danger);
        }
        &.success {
            color : var(--success);
        }
    }
`

const InputContainer = styled.div`
    font-weight      : 400;
    font-size        : 1rem;
    line-height      : 1.4375em;
    letter-spacing   : 0.00938em;
    color            : var(--text);
    position         : relative;
    cursor           : text;
    display          : inline-flex;
    align-items      : center;
    background-color : var(--bg-two);
    height           : 40px;
    padding-top      : 6px;
    padding-bottom   : 5px;
    padding-left     : 12px;
    padding-right    : 12px;
    border-radius    : var(--rounded-default);
    width            : 100%;
    border           : 1px solid var(--border);
    transition       : box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    .start-icon {
        display      : flex;
        align-items  : center;
        margin-right : 8px;
    }
    .end-icon {
        display     : flex;
        align-items : center;
        margin-left : 8px;
    }

    svg {
        width       : 20px;
        height      : 20px;
        margin-top  : 2px;
        display     : inline-block;
        fill        : currentColor;
        flex-shrink : 0;
        transition  : fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-size   : 1.5rem;
        color       : var(--text-secondary);
        cursor      : pointer;
    }

    input {
        font               : inherit;
        letter-spacing     : inherit;
        color              : currentColor;
        padding            : 4px 0;
        border             : 0;
        box-sizing         : content-box;
        outline            : none;
        background         : none;
        height             : 1.4375em;
        margin             : 0;
        display            : block;
        min-width          : 0;
        width              : 100%;
        animation-name     : mui-auto-fill-cancel;
        animation-duration : 10ms;

        &::placeholder {
            color : var(--placeholder);
        }

        &:read-only {
            cursor : pointer;
        }
    }

    &:focus-within {
        box-shadow : 0 0 0 2px var(--primary);
    }
`

const AutoCompleteContainer = styled.div`
    margin-top       : 5px;
    max-height       : 300px;
    width            : 100%;
    padding          : 5px 0;
    background-color : var(--content);
    border-radius    : var(--rounded-default);
    box-shadow       : var(--shadow-two);
    overflow         : auto;
    z-index          : 750;

    .auto-complete-item {
        position  : relative;
        padding   : 10px 16px;
        cursor    : pointer;
        font-size : 13px;
    
        &:hover {
            background : var(--content-light);
            span {
                &:first-child {
                    color : var(--primary);
                }
            }
        }

        span:not(.highlight) {
            &:first-child {
                font-size    : 14px;
                font-weight  : 500;
                margin-right : 2px;
            }
        }
    }

    .no-result {
        display         : flex;
        align-items     : center;
        justify-content : center;
        padding         : 15px 35px;
        color           : var(--text);

        svg {
            width        : 26px;
            height       : 26px;
            margin-right : 20px;
        }
    }
    .circle-loader {
        padding : 20px 0;
    }
`