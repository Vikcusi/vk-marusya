import { type FC, type ReactNode } from "react";
import "./FormField.css"

interface FormFieldProps {
    svgIcon: ReactNode;
    children: ReactNode;
    theme: "light" | "dark";
    hasError?: boolean
}

export const FormField: FC<FormFieldProps> = ({
    svgIcon,
    children,
    theme,
    hasError
}) => {
    return (
        <div className={`form-field ${hasError ? 'form-field--error' : ''}`} data-theme={theme}>
            {children}
            <span className="form-field__icon-wrapper">{svgIcon}</span>
        </div>
    )
}