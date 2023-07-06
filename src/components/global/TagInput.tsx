import React from 'react'
import Icon from './icons/Icon';
import useClickOutside from './hooks/useClickOutside'

interface Props extends React.HTMLAttributes<HTMLElement> {
    onTag?: (...args: any) => void
}

const TagInput = (props: Props) => {
    const { className, onTag = () => { } } = props;

    const [value, setValue] = React.useState<string>('')
    const [tags, setTags] = React.useState<any[]>([])
    const containerRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)
    const inputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null)

    useClickOutside(containerRef, () => addTag())

    function addTag() {
        if (value.length > 0) {
            setTags(prev => [...prev, value])
            setValue('')
            if (onTag) {
                onTag(tags)
            }
        }
    }

    function deleteTag(array: any[], key: number) {
        let arr = [...array]
        arr.splice(key, 1)
        return arr
    }

    function handleKeyDown(event: any) {
        if (event.which === 13) {
            addTag()
        }
    }

    function focusInput(event: any) {
        if (event.target.nodeName !== 'path' && event.target.nodeName !== 'svg') {
            inputRef.current!.focus()
        }
    }

    return (
        <div className={className ? `av-tag-input ${className}` : "av-tag-input"}
            ref={containerRef}
            onClick={event => focusInput(event)}
        >
            {tags.map((tag, i) => {
                return (
                    <div className='tag' key={i}>
                        {tag}
                        <Icon name="Cross" onClick={() => {
                            setTags(deleteTag(tags, i))
                            if (onTag) {
                                onTag(deleteTag(tags, i))
                            }
                        }} />
                    </div>
                )
            })}
            <input
                ref={inputRef}
                value={value}
                onChange={event => setValue(event.target.value)}
                onKeyDown={event => handleKeyDown(event)}
                style={{ marginLeft: tags.length > 0 ? '10px' : 0 }}
            />
        </div>
    )
}

export default TagInput;