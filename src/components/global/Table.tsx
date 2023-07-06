import React from 'react'
import Icon from '@/components/global/icons/Icon';

interface TableProps extends React.HTMLAttributes<HTMLElement> {
    thead?: any[] | null;
    children: React.ReactNode;
}

export const Table = (props: TableProps) => {
    const { thead, children, className, ...others } = props;

    return (
        <div className={className ? `av-table-container ${className}` : "av-table-container"}>
            <div className='av-table' {...others}>
                {thead &&
                    <>
                        <TableHead>
                            {thead &&
                                thead.map((el: any, i: number) => {
                                    return (
                                        !el?.action ? (
                                            <TableCell key={i}>
                                                {el}
                                            </TableCell>
                                        ) : (
                                            <TableCell key={i} className="th action" onClick={el.action}>
                                                {el.label} <Icon name="UpAndDown" />
                                            </TableCell>
                                        )
                                    )
                                })}
                        </TableHead>
                        <TableBody>
                            {children}
                        </TableBody>
                    </>
                }
                {!thead && children}
            </div>
        </div>
    )
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export const TableHead = (props: Props) => {
    const { children, className, ...others } = props;
    return (
        <div className={className ? `av-table-head ${className}` : "av-table-head"} {...others}>
            <div className='av-table-head-row'>
                {children}
            </div>
        </div>
    )
}

export const TableBody = (props: Props) => {
    const { children, className, ...others } = props;
    return (
        <div className={className ? `av-table-body ${className}` : "av-table-body"} {...others}>
            {children}
        </div>
    )
}

export const TableRow = (props: Props) => {
    const { children, className, ...others } = props;
    return (
        <div className={className ? `av-table-row ${className}` : "av-table-row"} {...others}>
            {children}
        </div>
    )
}

export const TableCell = (props: Props) => {
    const { children, className, ...others } = props;
    return (
        <div className={className ? `av-table-cell ${className}` : "av-table-cell"} {...others}>
            {children}
        </div>
    )
}