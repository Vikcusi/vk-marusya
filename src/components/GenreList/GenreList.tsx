import type { FC } from "react"
import { GenreCard } from "../GenreCard/GenreCard"
import "./GenreList.css"
import { Link } from "react-router-dom"

interface GenreListProps {
    genreList: string[]
}


export const GenreList: FC<GenreListProps> = ({ genreList }) => {
    if (genreList.length === 0) {
        return <div className="genre-list__empty">Жанры не найдены</div>;
    }

    return (
        <div className="genre-list">
            <h2 className="genre-list__title">Жанры фильмов</h2>
            <ul className="genre-list__list">
                {genreList.map((genre) => (
                    <li key={genre}>
                        <Link to={`/genres/${genre.toLocaleLowerCase()}`}>
                            <GenreCard genre={{ name: genre }} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}