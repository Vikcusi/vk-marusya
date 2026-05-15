import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { randomFilm, ratingFilm, type Movie } from "../../api/Movie";
import { RatingList } from "../../components/RatingList/RatingList";
import { TitleFilm } from "../../components/TitleFilm/TitleFilm";
import { Trailer } from "../../components/Trailer/Trailer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { profile, type Auth } from "../../api/Auth";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { addFavoritesFilms, removeFavoritesFilms } from "../../api/Favourites";


export const MainPage = () => {
    const navigate = useNavigate();
    const [isAuthFormVisible, setIsAuthFormVisible] = useState(false);

    const filmQuery = useQuery({
        queryKey: ["ratingFilmList"],
        queryFn: ratingFilm,
    }, queryClient);

    const films: Movie[] = filmQuery.data ?? [];

    const randomFilmQuery = useQuery({
        queryKey: ["film"],
        queryFn: randomFilm,
    }, queryClient);

    const { data: film, isLoading: isFilmLoading, isError: isFilmError, refetch } = randomFilmQuery;

    const { data: user, refetch: refetchUser } = useQuery<Auth | null>({
        queryKey: ['users', 'me'],
        queryFn: profile,
        retry: false,
    }, queryClient);

    const addFavouriteMutation = useMutation<void, Error, string>({
        mutationFn: addFavoritesFilms,
        onSuccess: () => {
            refetchUser();
        },
        onError: (error) => {
            console.error("Ошибка добавления в избранное:", error);
        }
    }, queryClient);

    const removeFavouriteMutation = useMutation<void, Error, string>({
        mutationFn: removeFavoritesFilms,
        onSuccess: () => {
            refetchUser();
        },
        onError: (error) => {
            console.error("Ошибка удаления из избранного:", error);
        }
    }, queryClient);

    const isFavourite = user?.favorites?.includes(String(film?.id)) || false;

    const handleAddToFavourites = (filmId: number) => {
        if (!user) {
            handleShowAuthForm();
            return;
        }

        const filmIdString = String(filmId);
        const isCurrentlyFavourite = user.favorites?.includes(filmIdString) || false;

        if (isCurrentlyFavourite) {
            removeFavouriteMutation.mutate(filmIdString);
        } else {
            addFavouriteMutation.mutate(filmIdString);
        }
    };

    const handleShowAuthForm = () => setIsAuthFormVisible(true);
    const handleCloseAuthForm = () => setIsAuthFormVisible(false);
    const handleLoginSuccess = () => {
        setIsAuthFormVisible(false);
        if (film?.id) handleAddToFavourites(film.id);
    };

    const [isTrailerVisible, setIsTrailerVisible] = useState(false);

    const handleCloseTrailer = () => {
        setIsTrailerVisible(false)
    }

    const handleShowTrailer = () => {
        setIsTrailerVisible(true)
    }

    const handleOpenInfo = () => {
        if (film?.id) {
            navigate(`/movie/${film.id}`);
        }
    };

    const handleReplayFilm = () => {
        refetch();
    }

    if (isFilmLoading || filmQuery.isLoading) {
        return <Loader />;
    }

    if (isFilmError || filmQuery.isError) {
        return <div>Ошибка загрузки данных</div>;
    }

    if (!film) {
        return <div>Фильм не загружен</div>;
    }

    return (
        <>
            <TitleFilm
                random
                user={user!}
                film={film!}
                onClickReplay={handleReplayFilm}
                isFavourite={isFavourite}
                onClickFavourites={handleAddToFavourites}
                onShowAuthForm={handleShowAuthForm}
                onClickInfo={handleOpenInfo}
                onClickTrailer={handleShowTrailer}
            />
            <RatingList ratingFilmList={films ?? []} />
            {isTrailerVisible && film && (
                <Trailer
                    film={film}
                    onClose={handleCloseTrailer}
                />
            )}
            {isAuthFormVisible && (
                <AuthForm
                    onClose={handleCloseAuthForm}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    )
}