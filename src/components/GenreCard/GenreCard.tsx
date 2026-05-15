import type { FC } from "react"
import './GenreCard.css'
import type { Genre } from "../../api/Movie"

interface GenreCardProps {
    img?: string,
    genre: Genre
}

export const GenreCard: FC<GenreCardProps> = ({ img, genre }) => {
    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="genre-card">
            <img className="genre-card__film" src={img} alt="" />
            <div className="genre-card__name">{capitalize(genre.name)}</div>
        </div>
    )
}