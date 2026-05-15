import { Button } from "../Button/Button"
import type { FC } from "react";
import "./FormSuccess.css"

interface FormSuccessProps {
    onLoginClick: () => void;
}

export const FormSuccess: FC<FormSuccessProps> = ({onLoginClick}) => {


    return (
        <div className="form-success">
            <p className="form-success__title">Регистрация завершена</p>
            <p className="form-success__text">Используйте вашу электронную почту для входа</p>
            <Button type="button" kind="primary" size="big" onClick={onLoginClick} >Войти</Button>
        </div>

    )
}