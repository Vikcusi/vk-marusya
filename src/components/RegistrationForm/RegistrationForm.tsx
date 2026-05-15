import IconEmail from "../../assets/icon/change/email/IconEmail"
import IconPassword from "../../assets/icon/change/password/IconPassword"
import IconPerson from "../../assets/icon/change/person/IconPerson"
import { FormField } from "../FormField/FormField"
import '../FormField/FormField.css'
import "./RegistrationForm.css"
import { Button } from "../Button/Button"
import { useState, type FC } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryClient } from "../../api/queryClient"
import { useMutation } from "@tanstack/react-query"
import { registerAuth, type RegisterData, type RegisterResponse } from "../../api/Auth"

interface RegistrationFormProps {
    onRegistrationSuccess: () => void
}

const CreateRegisterFormSchema = z
    .object({
        email: z.string().nonempty("Поле обязательно"),
        name: z.string().min(3).nonempty("Поле обязательно"),
        surname: z.string().min(3).nonempty("Поле обязательно"),
        password: z.string().min(5).nonempty("Поле обязательно"),
        confirmPassword: z.string().nonempty("Поле обязательно")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"]
    });

type CreateRegisterForm = z.infer<typeof CreateRegisterFormSchema>

export const RegistrationForm: FC<RegistrationFormProps> = ({ onRegistrationSuccess }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateRegisterForm>({
        resolver: zodResolver(CreateRegisterFormSchema),
        mode: "onBlur"
    })

    const [emailServerError, setEmailServerError] = useState(false);

    const registerMutation = useMutation<RegisterResponse, Error, RegisterData>({
        mutationFn: registerAuth,
        onSuccess: () => {
            onRegistrationSuccess()
        } ,
        onError: (error) => {
            console.error("Ошибка регистрации:", error);
            if (error.message.includes("email") || error.message.includes("exists")) {
                setEmailServerError(true);
            }
        }
    }, queryClient);

    const getFieldError = (fieldName: keyof CreateRegisterForm): boolean => {
        if (fieldName === "email") return !!errors[fieldName] || emailServerError;
        return !!errors[fieldName];
    };

    const renderFormField = (
        name: keyof CreateRegisterForm,
        placeholder: string,
        type: string,
        icon: React.ReactNode
    ) => (
        <FormField
            theme="light"
            svgIcon={icon}
            hasError={getFieldError(name)}
        >
            <input
                className="form-field__input"
                type={type}
                placeholder={placeholder}
                {...register(name)}
                disabled={isSubmitting}
            />
        </FormField>
    );


    return (
        <form className="registration-form" onSubmit={handleSubmit((data) => {
            registerMutation.mutate(data)
        })}>
            {renderFormField("email", "Электронная почта", "email", <IconEmail className="form-field__icon" />)}
            {renderFormField("name", "Имя", "text", <IconPerson className="form-field__icon" />)}
            {renderFormField("surname", "Фамилия", "text", <IconPerson className="form-field__icon" />)}
            {renderFormField("password", "Пароль", "password", <IconPassword className="form-field__icon" />)}
            {renderFormField(
                "confirmPassword",
                "Подтвердите пароль",
                "password",
                <IconPassword className="form-field__icon" />
            )}
            <Button type="submit" kind="primary" size="big" >Создать аккаунт</Button>
        </form>
    )
}