import React from 'react'
import { DayPicker, useInput } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import fr from 'date-fns/locale/fr';
import useClickOutside from './hooks/useClickOutside';
import Input from './Input';
import InputCard from './InputCard';

const InputDatePicker = (props: any) => {
    const { card, selected, onSelect, mode = 'single', fromDate, ...others } = props

    const [open, setOpen] = React.useState<boolean>(false)

    const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)

    useClickOutside(ref, () => setOpen(false))

    const { dayPickerProps } = useInput({
        fromYear: 2010,
        toYear: 2030,
        fromDate: fromDate,
        format: 'dd/mm/yyyy',
        required: true
    })

    const Element: JSX.Element = card ? (
        <InputCard {...others} readOnly onClick={() => setOpen(!open)} />
    ) : (
        <Input {...others} readOnly onClick={() => setOpen(!open)} />
    )

    return (
        <React.Fragment>
            {Element}
            {open && (
                <div className='av-datepikcer-input-wrapper datepicker-wrapper'>
                    <div className="av-datepicker-input datepicker" ref={ref}>
                        <DayPicker
                            {...dayPickerProps}
                            mode={mode}
                            selected={selected}
                            onSelect={mode === 'range' ? (date: any) => onSelect(date) : (dates: any) => {
                                onSelect(dates)
                                setOpen(false)
                            }}
                            locale={fr}
                            modifiersClassNames={{
                                selected: 'selected',
                                today: 'today'
                            }}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default InputDatePicker;