import type { FC } from "react"
import './RatingCard.css'
import type { Movie } from "../../api/Movie"

interface RatingCardProps {
    film: Movie,
    showRating?: boolean;
    rating?: number;
}

export const RatingCard: FC<RatingCardProps> = ({ film, rating, showRating}) => {
    return (
        <div className="rating-card">
            {showRating && (
                <span className="rating-card__number">{rating}</span>
            )}
            {film.posterUrl ? (
                <img
                    src={film.posterUrl}
                    alt={`Poster for ${film.title}`}
                    className="rating-card__film"
                />
            ) : (
                <div className="rating-card__placeholder">
                    No Poster
                </div>
            )}
        </div>
    )
}