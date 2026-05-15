import { useState, type FC } from "react"
import IconBack from "../../assets/icon/back-icon.svg"
import { RatingCard } from "../RatingCard/RatingCard"
import type { Movie } from "../../api/Movie"
import "./CertainGenreList.css"
import { Button } from "../Button/Button"
import { Link, useParams } from "react-router-dom"

interface CertainGenreListProps {
    filmList: Movie[],
    isLoading?: boolean
}


export const CertainGenreList: FC<CertainGenreListProps> = ({ filmList, isLoading }) => {
    const { genre } = useParams<{ genre: string }>();

    const [displaedCount, setDisplaedCount] = useState(10);

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!genre) {
        return <div className="genre-list__error">Жанр не указан</div>;
    }

    const filteredFilm = filmList.filter((film) =>
        film.genres?.includes(genre)
    );

    const sortFilms = filteredFilm.sort((a, b) => b.tmdbRating - a.tmdbRating)

    const displayedFilms = sortFilms.slice(0, displaedCount);

    const hasMore = displaedCount < sortFilms.length;

    const hendleOnLoadMore = () => {
        setDisplaedCount(prev => prev + 10)
    }

    if (filmList.length === 0) {
        return <div className="genre-list__empty">Фильмы не найдены</div>;
    }

    return (
        <div className="certain-genre">
            <div className="certain-genre__wrapper">
                <Link to={"/genres"} className="certain-genre__btn-back">
                    <img className="certain-genre__icon" src={IconBack} />
                </Link>
                <h2 className="certain-genre__title">{capitalize(genre)}</h2>
            </div>
            <ul className="certain-genre__list">
                {displayedFilms.map((film) => (
                    <Link to={`/movie/${film.id}`} key={film.id}>
                        <RatingCard film={film} />
                    </Link>
                ))}
            </ul>
            {hasMore && !isLoading && (
                <div className="certain-genre__btn">
                    <Button
                        kind="primary"
                        title="button"
                        size="medium"
                        onClick={hendleOnLoadMore}
                    >Показать ещё</Button>
                </div>
            )}
        </div>
    )
}