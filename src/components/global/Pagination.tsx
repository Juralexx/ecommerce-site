import React from 'react'
import Link from 'next/link'
import { addActive, addClass } from '../../functions/utils'
import Icon from './icons/Icon';

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    array: any[];
    baseRoute: string;
    currentPage: number;
    count: number;
    limit: number;
}

export const MiddlePagination = (props: PaginationProps) => {
    const { array, baseRoute, currentPage, count, limit, className, ...others } = props

    return (
        array &&
        <div className={className ? `av-pagination-middle ${className}` : "av-pagination-middle"} { ...others }>
            <div className="pagination">
                {currentPage - 1 > 0 &&
                    <React.Fragment>
                        <Link href={`${baseRoute}`} className='arrow' passHref>
                            <Icon name="DoubleArrowLeft" />
                        </Link>
                        <Link href={`${baseRoute}/?p=${currentPage - 1}`} className='arrow' passHref>
                            <Icon name="CaretLeft" />
                        </Link>
                    </React.Fragment>
                }
                {[...new Array(Math.ceil(count / limit))].map((_, key) => {
                    return (
                        <Link href={`${baseRoute}/?p=${key + 1}`}
                            key={key}
                            className={`${addClass(currentPage > (key + 3) || currentPage < (key - 1), 'hidden')} ${addActive(currentPage === (key + 1))}`}
                        >
                            {key + 1}
                        </Link>
                    )
                })}
                {currentPage + 1 <= array.length &&
                    <React.Fragment>
                        <Link href={`${baseRoute}/?p=${currentPage + 1}`} className='arrow' passHref>
                            <Icon name="CaretRight" />
                        </Link>
                        <Link href={`${baseRoute}/?p=${array.length}`} className='arrow' passHref>
                            <Icon name="DoubleArrowRight" />
                        </Link>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

interface SidePaginationProps extends React.HTMLAttributes<HTMLElement> {
    array: any[];
    currentPage: number;
    count: number;
    limit: number;
    router: {
        pathname: string;
        query: { [key: string]: any };
    }
}

export const SidePagination = (props: SidePaginationProps) => {
    const { array, router, currentPage, count, limit, className, ...others } = props

    return (
        array &&
        <div className={className ? `av-pagination-side ${className}` : "av-pagination-side"} { ...others }>
            <div className="pagination">
                <div className="pagination-right">
                    {count > 0 && (((currentPage - 1) * limit) + 1) + ' ⎯ ' + (Math.min(currentPage * limit, count)) + ' sur '} {count} résultats
                </div>
                <div className="pagination-right">
                    <div className='count'>
                        {currentPage} sur {Math.ceil(count / limit)}
                    </div>
                    <Link
                        href={{ pathname: currentPage <= 2 ? router.pathname : `${router.pathname}`, query: { ...router.query, p: currentPage - 1 } }}
                        passHref
                        className={currentPage <= 1 ? 'disabled' : ''}
                    >
                        <Icon name="ArrowLeft" />
                    </Link>
                    <Link
                        href={{ pathname: currentPage < Math.ceil(count / limit) ? `${router.pathname}` : '', query: { ...router.query, p: currentPage + 1 } }}
                        passHref
                        className={currentPage < Math.ceil(count / limit) ? '' : 'disabled'}
                    >
                        <Icon name="ArrowRight" />
                    </Link>
                </div>
            </div>
        </div>
    )
}