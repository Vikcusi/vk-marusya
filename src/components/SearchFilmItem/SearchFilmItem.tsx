import type { FC } from "react"
import type { Movie } from "../../api/Movie"
import { Rating } from "../Rating/Rating"
import { Loader } from "../Loader/Loader"
import "./SearchFilmItem.css"

interface SearchFilmItemProps {
    searchFilm: Movie
}

export const SearchFilmItem: FC<SearchFilmItemProps> = ({ searchFilm, }) => {
    function time_convert(num: number) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} ч ${minutes} мин`;
    }

    if (!searchFilm) {
        return <Loader />;
    }
    return (
        <li className="search-item">
            <img className="search-item__img" src={searchFilm.posterUrl} alt={searchFilm.title} />
            <div className="search-item__info">
                <div className="search-item__wrapper">
                    <Rating size="rating--small" rating={searchFilm.tmdbRating} />
                    <span className="search-item__text">{searchFilm.releaseYear}</span>
                    <span className="search-item__text">{searchFilm.genres[0]}</span>
                    <span className="search-item__text">{time_convert(searchFilm.runtime)}</span>
                </div>
                <p className="search-item__title">{searchFilm.title}</p>
            </div>
        </li>
    )
}