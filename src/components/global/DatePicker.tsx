import React from 'react'
import { DayPicker, useInput } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import fr from 'date-fns/locale/fr';
import useClickOutside from './hooks/useClickOutside';

export const DatePicker = (props: any) => {
    const { open, setOpen, selected, onDayClick, fromDate } = props

    const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)

    useClickOutside(ref, () => {
        if (typeof open === 'object') 
            setOpen((prev: any) => ({ ...prev, state: false }))
        else setOpen(false)
    })

    const { dayPickerProps } = useInput({
        fromYear: 2010,
        toYear: 2030,
        fromDate: fromDate,
        format: 'dd/mm/yyyy',
        required: true
    })

    return (
        open && (
            <div className='av-datepicker-wrapper datepicker-wrapper'>
                <div className="av-datepicker datepicker" ref={ref}>
                    <DayPicker
                        {...dayPickerProps}
                        mode="single"
                        selected={selected}
                        onDayClick={onDayClick}
                        locale={fr}
                        modifiersClassNames={{
                            selected: 'selected',
                            today: 'today'
                        }}
                    />
                </div>
            </div>
        )
    )
}