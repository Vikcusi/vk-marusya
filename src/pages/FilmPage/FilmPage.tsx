import { useMutation, useQuery } from "@tanstack/react-query";
import { movieId } from "../../api/Movie";
import { queryClient } from "../../api/queryClient";
import { AboutFilm } from "../../components/AboutFilm/AboutFilm";
import { TitleFilm } from "../../components/TitleFilm/TitleFilm";
import { useState } from "react";
import { Trailer } from "../../components/Trailer/Trailer";
import { useParams } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { profile, type Auth } from "../../api/Auth";
import { addFavoritesFilms, removeFavoritesFilms } from "../../api/Favourites";
import { Loader } from "../../components/Loader/Loader";

export const FilmPage = () => {
    const { id } = useParams();
    const [isAuthFormVisible, setIsAuthFormVisible] = useState(false);

    if (!id) {
        return <div>Id не указан</div>;
    }

    const movieQuery = useQuery({
        queryKey: ["film", id],
        queryFn: () => movieId(id),
    }, queryClient);

    const { data: film, isLoading, isError } = movieQuery;

    const [isTrailerVisible, setIsTrailerVisible] = useState(false);

    const handleCloseTrailer = () => {
        setIsTrailerVisible(false)
    }

    const handleShowTrailer = () => {
        setIsTrailerVisible(true)
    }

    const { data: user, refetch: refetchUser } = useQuery<Auth | null>({
        queryKey: ['users', 'me'],
        queryFn: profile,
        retry: false,
    });

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

    if (isLoading) {
       return <Loader/>;
    }

    if (isError) {
        return <div>Ошибка загрузки фильма</div>;
    }

    if (!film) {
        return <div>Фильм не найден</div>;
    }

    return (

        
        <div>
            <TitleFilm
                user={user!}
                film={film}
                classAboutFilm="movie-page"
                isFavourite={isFavourite}
                onClickFavourites={handleAddToFavourites}
                onShowAuthForm={handleShowAuthForm}
                onClickTrailer={handleShowTrailer}
            />
            <AboutFilm film={film} />
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
        </div>
    )
}