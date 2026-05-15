import type { FC } from "react"
import type { Movie } from "../../api/Movie"
import { RatingCard } from "../RatingCard/RatingCard"
import IconCross from "../../assets/icon/cross.svg"
import './FavouritesFilmsList.css'
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface FavouritesFilmsLisProps {
    favouritesList: Movie[],
    onClickRemoveFavourites: (filmId: number) => void;
}

export const FavouritesFilmsList: FC<FavouritesFilmsLisProps> = ({ favouritesList, onClickRemoveFavourites }) => {
    return (
        <>
            <ul className="favourites-list">
                {favouritesList.map((film) => (
                    <li key={film.id} className="favourites-list__item">
                        <Link to={`/movie/${film.id}`}>
                            <RatingCard film={film} />
                        </Link>
                        <button className="favourites-list__btn" onClick={() => onClickRemoveFavourites((film.id))}>
                            <img className="favourites-list__icon" src={IconCross} alt="Удалить из избранного" />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="favourites-list__mobile">
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={1.2}
                    grabCursor={true}
                    touchMoveStopPropagation={true}
                    resistance={true}
                    loop={false}
                    resistanceRatio={1}
                    lazyPreloaderClass="swiper-lazy-preloader"
                    pagination={{ clickable: true }}
                >
                    {favouritesList.map((film) => (
                        <SwiperSlide key={film.id}>
                            <Link to={`/movie/${film.id}`} className="favourites-list__item">
                                <RatingCard film={film} />
                            </Link>
                            <button className="favourites-list__btn" onClick={() => onClickRemoveFavourites((film.id))}>
                                <img className="favourites-list__icon" src={IconCross} alt="Удалить из избранного" />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}