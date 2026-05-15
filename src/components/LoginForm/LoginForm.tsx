import IconEmail from "../../assets/icon/change/email/IconEmail"
import IconPassword from "../../assets/icon/change/password/IconPassword"
import { FormField } from "../FormField/FormField"
import '../FormField/FormField.css'
import "./LoginForm.css"
import { Button } from "../Button/Button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { queryClient } from "../../api/queryClient"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/Auth"
import { useState, type FC } from "react"

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const CreateLoginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(5)
})

type CreateLoginForm = z.infer<typeof CreateLoginFormSchema>

export const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateLoginForm>({
        resolver: zodResolver(CreateLoginFormSchema)
    })

    const [emailServerError, setEmailServerError] = useState(false);
    const [passwordServerError, setPasswordServerError] = useState(false);

    const loginMutation = useMutation<void, Error, { email: string; password: string }>({
        mutationFn: login,
        onError: (err) => {
            if (err.message.includes("email") || err.message.includes("404")) {
                setEmailServerError(true);
                setPasswordServerError(false);
            } else if (err.message.includes("password") || err.message.includes("401")) {
                setPasswordServerError(true);
                setEmailServerError(false);
            } else {
                setEmailServerError(true);
                setPasswordServerError(true);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
            setEmailServerError(false);
            setPasswordServerError(false);
            onLoginSuccess();
        }
    });

    const getFieldError = (fieldName: keyof CreateLoginForm): boolean => {
        if (fieldName === "email") return !!errors[fieldName] || emailServerError;
        if (fieldName === "password") return !!errors[fieldName] || passwordServerError;
        return !!errors[fieldName];
    };

    return (
        <form className="login-form" onSubmit={handleSubmit((data) => {
            loginMutation.mutate(data)
        })}>
            <FormField
                theme="light"
                hasError={getFieldError("email")}
                svgIcon={<IconEmail className='form-field__icon' />}
            >
                <input
                    className="form-field__input"
                    type='email'
                    placeholder='Электронная почта'

                    {...register("email")}
                />
            </FormField>
            <FormField
                theme="light"
                hasError={getFieldError("password")}
                svgIcon={<IconPassword className='form-field__icon' />}
            >
                <input
                    className="form-field__input"
                    type='password'
                    placeholder='Пароль'
                    {...register("password")}
                />
            </FormField>
            <Button type="submit" kind="primary" size="big">Войти</Button>
        </form>
    )
}

