import type { FC } from "react";
import { MovieDescription } from "../MovieDescription/MovieDescription"
import "./AboutFilm.css"
import type { Movie } from "../../api/Movie";
import { getLanguageName } from "../language/language";

interface AboutFilmProps {
    film: Movie
}

export const AboutFilm: FC<AboutFilmProps> = ({ film }) => {
    if (!film) {
        return <div>Загрузка...</div>;
    }
    return (
        <div className="about-film">
            <h2 className="about-film__title">О фильме</h2>
            <div className="about-film__wrapper">
                {film.language && (
                    <MovieDescription name="Язык оригинала" description={getLanguageName(film.language)} />
                )}
                {film.genres && film.genres.length > 0 && (
                    <MovieDescription
                        name="Жанр"
                        description={film.genres.join(', ')}
                    />
                )}
                {film.budget && (
                    <MovieDescription name="Бюджет" description={`${film.budget} руб.`} />
                )}
                {film.revenue && (
                    <MovieDescription name="Выручка" description={`${film.revenue} руб.`} />
                )}
                {film.director && (
                    <MovieDescription name="Режиссёр" description={film.director} />
                )}
                {film.production && (
                    <MovieDescription name="Продакшен" description={film.production} />
                )}
                {film.awardsSummary && (
                    <MovieDescription name="Награды" description={film.awardsSummary} />
                )}
            </div>
        </div>
    )
}