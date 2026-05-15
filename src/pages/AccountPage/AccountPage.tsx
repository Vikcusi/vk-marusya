import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import IconHeart from "../../assets/icon/change/heart/IconHeart";
import IconPerson from "../../assets/icon/change/person/IconPerson";
import "./AccountPage.css"
import { useState } from "react";
import { FavouritesFilmsList } from "../../components/FavouritesFilmsList/FavouritesFilmsList";
import { Account } from "../../components/Account/Account";
import { favoritesFilms, removeFavoritesFilms } from "../../api/Favourites";
import { type Movie } from "../../api/Movie";
import { profile } from "../../api/Auth";
import { useIsMobile } from "../../hooks/useIsMobile";

export const AccountPage = () => {
    const isMobile = useIsMobile(768);
    const [menuType, setMenuType] = useState("favourites")

    const filmQuery = useQuery({
        queryKey: ["favouritesList"],
        queryFn: favoritesFilms,
    }, queryClient);

    const films: Movie[] = filmQuery.data ?? [];

    const profileQuery = useQuery({
        queryKey: ["account"],
        queryFn: profile,
    }, queryClient);

    const { data: user } = profileQuery;

    const handleClick = () => {
        setMenuType((prevState) =>
            prevState === "favourites" ? "settings" : "favourites",
        );
    };

    const removeFavouriteMutation = useMutation<void, Error, string>({
        mutationFn: removeFavoritesFilms,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favouritesList'] });
        },
        onError: (error) => {
            console.error("Ошибка удаления из избранного:", error);
        }
    }, queryClient);

    const handleRemoveFavouriteFilm = (filmId: number) => {
        const filmIdString = String(filmId);
        removeFavouriteMutation.mutate(filmIdString);
    };

    return (
        <div className="account">
            <h2 className="account__title">Мой аккаунт</h2>
            <ul className="account__list">
                <MenuItem
                    active={menuType === "favourites" ? "active" : ""}
                    title={isMobile ? "Избранное" : "Избранные фильмы"}
                    icon={<IconHeart />}
                    onClick={handleClick}
                    link="/account"
                />
                <MenuItem
                    active={menuType === "favourites" ? "" : "active"}
                    title={isMobile ? "Настройки" : "Настройка аккаунта"}
                    icon={<IconPerson />}
                    onClick={handleClick}
                    link="/account"
                />
            </ul>
            {menuType === "favourites" ? (
                filmQuery.isLoading ? (
                    <div className="account__text">Загрузка избранных фильмов...</div>
                ) : films.length === 0 ? (
                    <div className="account__text">Пока нет избранных фильмов</div>
                ) : (
                    <FavouritesFilmsList favouritesList={films} onClickRemoveFavourites={handleRemoveFavouriteFilm} />
                )
            ) : (
                <Account account={user!} />
            )}
        </div>
    )
}