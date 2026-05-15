import type { FC } from "react"
import './MovieDescription.css'

interface MovieDescriptionProps {
    name: string,
    description: string
}

export const MovieDescription: FC<MovieDescriptionProps> = ({ name, description }) => {
    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <li className="movie-description">
            <div className="movie-description__wrapper">
                <div className="movie-description__title">{name}</div>
                <div className="movie-description__ellipsis"></div>
            </div>
            <div className="movie-description__text">{capitalize(description)}</div>
        </li>
    )
}