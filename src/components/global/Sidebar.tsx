import React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Sidebar = (props: Props) => {
    const { className, ...others } = props;
    return (
        <div className={className ? `av-sidebar ${className}` : 'av-sidebar'} {...others}>
            {props.children}
        </div>
    )
};

export const SidebarInner = (props: Props) => {
    const { className, ...others } = props;
    return (
        <div className={className ? `av-sidebar-inner ${className}` : 'av-sidebar-inner'} {...others}>
            {props.children}
        </div>
    )
}

export const SidebarList = (props: Props) => {
    const { className, ...others } = props;
    return (
        <div className={className ? `av-sidebar-list ${className}` : 'av-sidebar-list'} {...others}>
            {props.children}
        </div>
    )
}

export const SidebarItem = (props: Props) => {
    const { className, ...others } = props;
    return (
        <div className={className ? `av-sidebar-item ${className}` : 'av-sidebar-item'} {...others}>
            {props.children}
        </div>
    )
}