import type { FC, HTMLAttributes } from "react";
import './Button.css'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    kind?: "primary" | "secondary";
    type?: "submit" | "reset" | "button";
    size: "big" | "medium" | "small";
    iconFiil?: string; 
    onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ type, size, kind, iconFiil, onClick, ...props}) => {
    return (
        <button 
            className={`btn`} 
            data-size = {size}
            type={type}
            data-fill={iconFiil}
            data-kind={kind} {...props}
            onClick={onClick}>    
        </button>
    )
}