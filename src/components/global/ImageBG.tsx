import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const ImageBG = (props: Props) => {
    const { children, className, onClick, ...others } = props
    return (
        <div className={className ? `av-empty-img ${className}` : 'av-empty-img'} {...others} onClick={onClick}>
            {props.children}
        </div>
    )
}

export default ImageBG;