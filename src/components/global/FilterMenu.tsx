import React from 'react'
import Button from './Button'
import { addActive } from '@/functions/utils'
import Icon from './icons/Icon';
import useClickOutside from './hooks/useClickOutside'

const FilterMenu = (props: any) => {
    const { onValidate, onReset } = props
    const [openFilters, setOpenFilters] = React.useState<boolean>(false)

    const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)
    useClickOutside(ref, () => setOpenFilters(false))

    return (
        <div className='av-filter-menu-container' ref={ref}>
            <Button className='v-classic' onClick={() => setOpenFilters(!openFilters)}>
                <Icon name="Settings" className="start-icon" /> Filtrer
            </Button>
            <div className={`av-filter-menu ${addActive(openFilters)}`}>
                <div className='av-filter-menu-btns'>
                    <Button className='v-classic' onClick={() => {
                        onReset()
                        setOpenFilters(false)
                    }}>
                        Réinitialiser
                    </Button>
                    <Button className='v-primary fullwidth' onClick={() => {
                        setOpenFilters(false)
                        return onValidate()
                    }}>
                        Appliquer
                    </Button>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default FilterMenu;

export const FilterSubMenu = (props: any) => {
    const { children, name } = props
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <div className={`av-submenu ${addActive(open)}`}>
            <div className='filter-submenu-header' onClick={() => setOpen(!open)}>
                {name} <Icon name="CaretDown" />
            </div>
            <div className='cells-container'>
                {children}
            </div>
        </div>
    )
}