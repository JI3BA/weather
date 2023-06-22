import {FC, ReactNode} from "react";

type ButtonType = {
    onClick: () => void,
    children: ReactNode,
    className: string
}

export const Button: FC<ButtonType> = ({onClick, children, className}) => {
    return <button className={className} onClick={onClick}>{children}</button>
}