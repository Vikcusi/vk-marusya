import { type FC } from "react"
import type { Movie } from "../../api/Movie"
import { Link } from "react-router-dom"
import "./SearchFilmList.css"
import { SearchFilmItem } from "../SearchFilmItem/SearchFilmItem"

interface SearchFilmListProps {
    searchFilms: Movie[],
    searchName: string,
    onMovieClick?: () => void
}

export const SearchFilmList: FC<SearchFilmListProps> = ({ searchFilms, onMovieClick, searchName }) => {
    const filteredFilms = searchFilms.filter(({ title }) => {
        const filterName = title.toLowerCase().includes(searchName);
        return filterName;
    })

    const displayedFilmsSearch = filteredFilms.slice(0, 5);

    return (
        <ul className="search-list">
            {displayedFilmsSearch.map((film) => (
                <Link to={`/movie/${film.id}`} key={film.id} onClick={onMovieClick}>
                    <SearchFilmItem searchFilm={film} />
                </Link>
            ))}
            {displayedFilmsSearch.length === 0 && (
                <div className="search-list__non-list">Ничего не найдено</div>
            )}
        </ul>
    )
} 