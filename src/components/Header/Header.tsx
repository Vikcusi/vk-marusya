import IconLogo from "../../assets/icon/logo/logo-white.svg"
import IconSearch from "../../assets/icon/change/search/IconSearch"
import IconGenres from "../../assets/icon/genres.svg"
import { FormField } from "../FormField/FormField"
import "./Header.css"
import '../FormField/FormField.css'
import { MenuItem } from "../MenuItem/MenuItem"
import { useRef, useState, type ChangeEvent } from "react"
import { AuthForm } from "../AuthForm/AuthForm"
import { useQuery } from "@tanstack/react-query"
import { profile, type Auth } from "../../api/Auth"
import { queryClient } from "../../api/queryClient"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { SearchFilmList } from "../SearchFilmList/SearchFilmList"
import { movie, type Movie } from "../../api/Movie"
import IconPerson from "../../assets/icon/change/person/IconPerson"
import { SearchMobileView } from "../SearchMobileView/SearchMobileView"
import "../../App.css"

export const Header = () => {
    const [menuType, setMenuType] = useState("main");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSearchMobileVisible, setIsSearchMobileVisible] = useState(false);
    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate()

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleOpenSearchMobile = () => {
        setIsSearchMobileVisible(true);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);
    };

    const handleCloseSearchMobile = () => {
        setIsSearchMobileVisible(false);
    };

    const searchName = searchParam.get("searchName") || "";

    const filmQuery = useQuery({
        queryKey: ["searchFilms"],
        queryFn: movie,
    }, queryClient);

    const films: Movie[] = filmQuery.data ?? [];

    const { data: user} = useQuery<Auth | null>({
        queryKey: ["users", "me"],
        queryFn: async () => {
            try {
                const userData = await profile();
                return userData;
            } catch (err: any) {
                if (err.message === 'Unauthorized') {
                    return null;
                }
                console.error('Profile fetch error:', err);
                throw err;
            }
        },
        retry: false,
    }, queryClient);

    const handleClick = (type: string) => {
        setMenuType(type);
    };

    const handleNavigateGenre = () => {
        navigate("/genres")
    };

    const handleNavigateAccount = () => {
        navigate("/account")
    };

    const handleCloseForm = () => {
        setIsFormVisible(false)
    }

    const handleOpenForm = () => {
        setIsFormVisible(true)
    }

    const handleLoginSuccess = () => {
        setIsFormVisible(false);
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    };

    const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam({
            searchName: value.toLowerCase(),
        });
    };

    return (
        <header className="header">
            <div className='container'>
                <div className="header__wrapper">
                    <Link to="/" className="header__logo-link">
                        <img className="header__logo-icon" src={IconLogo} alt="Лого"></img>
                    </Link>
                    <div className="header__content">
                        <ul className="header__menu-list">
                            <MenuItem
                                active={menuType === "main" ? "active" : ""}
                                title="Главная"
                                onClick={() => handleClick("main")}
                                link="/"
                            />
                            <MenuItem
                                active={menuType === "genres" ? "active" : ""}
                                title="Жанры"
                                onClick={() => handleClick("genres")}
                                link="/genres"
                            />
                        </ul>
                        <FormField theme="dark" svgIcon={<IconSearch />}>
                            <input
                                type="search"
                                placeholder="Поиск"
                                value={searchName}
                                onChange={handleSearchName}
                            />
                            {searchName && <SearchFilmList searchFilms={films} searchName={searchName} />}
                        </FormField>

                        {user && (
                            <MenuItem
                                active="active"
                                title={user.surname}
                                link="/account"
                            />
                        )}

                        {!user && (
                            <button
                                className="header__btn"
                                type="button"
                                onClick={handleOpenForm}
                            >
                                Войти
                            </button>
                        )}
                    </div>

                    {isFormVisible && (
                        <AuthForm onClose={handleCloseForm} onLoginSuccess={handleLoginSuccess} />
                    )}

                    <div className="header__menu">
                        <button
                            className="header__menu-icon"
                            type="button"
                            aria-label="Перейти к жанрам"
                            onClick={handleNavigateGenre}
                        >
                            <img src={IconGenres} alt="" />
                        </button>
                        <button
                            className="header__menu-icon"
                            type="button"
                            aria-label="Поиск фильма"
                            onClick={handleOpenSearchMobile}
                        >
                            <IconSearch />
                        </button>
                        <button
                            className="header__menu-icon"
                            type="button"
                            aria-label="Перейти в аккаунт"
                            onClick={!user ? handleOpenForm : handleNavigateAccount}
                        >
                            <IconPerson />
                        </button>
                        {isSearchMobileVisible && (<SearchMobileView onClose={handleCloseSearchMobile} inputRef={searchInputRef as React.RefObject<HTMLInputElement>} />)}
                    </div>
                </div>
            </div>
        </header >
    )
}