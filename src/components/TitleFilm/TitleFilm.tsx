import IconReplay from "../../assets/icon/replay.svg"
import "./TitleFilm.css"
import { Rating } from "../Rating/Rating";
import { Button } from "../Button/Button";
import IconHeart from "../../assets/icon/change/heart/IconHeart";
import type { Movie } from "../../api/Movie";
import type { FC } from "react";
import { Loader } from "../Loader/Loader";
import type { Auth } from "../../api/Auth";

interface TitleFilmProps {
    user: Auth,
    film: Movie,
    random?: boolean,
    classAboutFilm?: "movie-page" | "",
    onClickTrailer: () => void,
    onClickInfo?: () => void,
    onClickFavourites: (filmId: number) => void;
    onShowAuthForm: () => void;
    isFavourite?: boolean;
    onClickReplay?: () => void
}

export const TitleFilm: FC<TitleFilmProps> = (
    {
        user,
        film,
        random,
        classAboutFilm,
        onClickTrailer,
        onClickInfo,
        onClickReplay,
        onClickFavourites,
        onShowAuthForm,
        isFavourite = false
    }) => {
    function time_convert(num: number) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} ч ${minutes} мин`;
    }

    if (!film) {
        return <Loader />;
    }

    const handleFavouriteClick = () => {
        if (!user) {
            onShowAuthForm();
        } else {
            onClickFavourites(film.id);
        }
    };

    return (
        <div className="title-film">
            <div className="title-film__info">
                <div className="title-film__definition">
                    <div className="title-film__wrapper">
                        <Rating rating={film.tmdbRating} />
                        <span className="title-film__text">{film.releaseYear}</span>
                        <span className="title-film__text">{film.genres[0]}</span>
                        <span className="title-film__text">{time_convert(film.runtime)}</span>
                    </div>
                    <h2 className="title-film__title">{film.title}</h2>
                    <p className="title-film__description">{film.plot}</p>
                </div>
                <div className={`title-film__btn-wrapper ${classAboutFilm}`}>
                    <Button onClick={onClickTrailer} size="medium" kind="primary" type="button">Трейлер</Button>
                    {random && (
                        <Button onClick={onClickInfo} size="medium" kind="secondary" type="button">О фильме</Button>
                    )}
                    <Button onClick={handleFavouriteClick} size="small" kind="secondary" type="button"><IconHeart filled={isFavourite} /></Button>
                    {random && (
                        <Button onClick={onClickReplay} size="small" kind="secondary" type="button">
                            <img src={IconReplay} alt="replay" />
                        </Button>
                    )}
                </div>
            </div>
            <img className="title-film__img" src={film.backdropUrl} alt={film.title} />
        </div>
    )
}