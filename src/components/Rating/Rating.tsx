import { type FC} from "react";
import IconStar from "../../assets/icon/star.svg" 
import "./Rating.css"

interface RatingProps {
    rating: number,
    size?: "rating--small" | ""
}

export const Rating: FC<RatingProps> = ({rating, size}) => {
    const color = ():string => {
        if (rating >= 8) {
            return "rating-yellow"
        }

        if (rating >= 6) {
            return "rating-green"
        }

        if (rating >= 5) {
            return "rating-grey"
        }

        return "rating-red"
    }

    return (
        <div className={`rating ${color()} ${size}`}>
            <img className="rating__img" src={IconStar} alt="star" />
            <span className="rating__number">{rating.toFixed(1)}</span>
        </div>
    )
}