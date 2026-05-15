import { useEffect, useState, type FC } from "react";
import IconCross from "../../assets/icon/cross.svg"
import IconLogo from "../../assets/icon/logo/logo-black.svg"

import "./AuthForm.css";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { FormSuccess } from "../FormSuccess/FormSuccess";

interface AuthFormProps {
    onClose: () => void,
    onLoginSuccess: () => void
}

export const AuthForm: FC<AuthFormProps> = ({ onClose, onLoginSuccess }) => {
    const [authType, setAuthType] = useState<"auth" | "register" | "success">("auth");
    const [isOpen, setIsOpen] = useState(true);

    const handleSwitchToRegister = () => {
        setAuthType("register");
    };

    const handleSwitchToLogin = () => {
        setAuthType("auth");
    };

    const handleRegistrationSuccess = () => {
        setAuthType("success");
    };

    const handleSuccessToLogin = () => {
        setAuthType("auth");
    };

    const onCloseHandler = () => {
        setIsOpen(false);
        onClose();
    };

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    return (
        <div className="auth-form">
            <div className="auth-form__form">
                <button className="auth-form__cross" onClick={onCloseHandler} aria-label="Закрыть форму авторизации">
                    <img src={IconCross} alt="" />
                </button>
                <img className="auth-form__logo" src={IconLogo} alt="Лого"></img>
                {authType === "auth" && (
                    <div className="auth-form__wrapper">
                        <div className="auth-form__field">
                            <LoginForm onLoginSuccess={onLoginSuccess} />
                        </div>
                        <button className="auth-form__button" onClick={handleSwitchToRegister}>
                            Регистрация
                        </button>
                    </div>
                )}
                {authType === "register" && (
                    <div className="auth-form__wrapper">
                        <p className="auth-form__title">Регистрация</p>
                        <div className="auth-form__field">
                            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
                        </div>
                        <button className="auth-form__button" onClick={handleSwitchToLogin}>
                            У меня есть пароль
                        </button>
                    </div>
                )}
                {authType === "success" && (
                    <FormSuccess
                        onLoginClick={handleSuccessToLogin}
                    />
                )}
            </div>
        </div>
    );
};