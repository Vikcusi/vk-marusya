import type { FC } from "react"
import './Account.css'
import { logout, profile, type Auth } from "../../api/Auth"
import { Button } from "../Button/Button"
import IconEmail from "../../assets/icon/change/email/IconEmail"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"

interface AccountProps {
    account: Auth
}

export const Account: FC<AccountProps> = ({ account }) => {
    const navigate = useNavigate();

    function handleReturnMainPage() {
        navigate("/");
    }

    const { refetch: refetchUser } = useQuery<Auth | null>({
        queryKey: ['users', 'me'],
        queryFn: profile,
        retry: false,
    }, queryClient);

    const logoutMutation = useMutation<void, Error>({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();
            handleReturnMainPage();
            refetchUser()
        },
        onError: (error) => {
            console.error("Ошибка выхода из аккаунта:", error);
        }
    });

    function initials(name: string, surname: string) {
        return name[0] + surname[0]
    }

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="account-info">
            <div className="account-info__wrapper">
                <div className="account-info__parameter">
                    <div className="account-info__icon">
                        <span className="account-info__initials">{initials(account.name, account.surname)}</span>
                    </div>
                    <div className="account-info__description">
                        <p className="account-info__title">Имя Фамилия</p>
                        <p className="account-info__text">{account.name} {account.surname}</p>
                    </div>
                </div>
                <div className="account-info__parameter">
                    <div className="account-info__icon">
                        <IconEmail className="account-info__email" />
                    </div>
                    <div className="account-info__description">
                        <p className="account-info__title">Электронная почта</p>
                        <p className="account-info__text">{account.email}</p>
                    </div>
                </div>
            </div>
            <Button kind="primary" size="medium" onClick={handleLogout}>
                Выйти из аккаунта
            </Button>
        </div>
    )
}