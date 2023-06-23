import {ChangeEvent, FC, KeyboardEvent} from 'react'

type InputType = {
    className: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    value: string,
    maxLength?: number,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Input: FC<InputType> = ({className, type, onChange, ...rest}) => {
    return <input className={className} type={type} onChange={onChange} {...rest} />
}