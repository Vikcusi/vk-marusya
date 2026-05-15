import { type FC } from "react"
import type { Movie } from "../../api/Movie"
import { RatingCard } from "../RatingCard/RatingCard"
import './RatingList.css'
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface RatingListProps {
    ratingFilmList: Movie[]
}


export const RatingList: FC<RatingListProps> = ({ ratingFilmList }) => {

    return (
        <div className="rating-list">
            <h2 className="rating-list__title">Топ 10 фильмов</h2>
            <ul className="rating-list__list">
                {ratingFilmList.map((film, index) => (
                    <Link to={`/movie/${film.id}`} key={film.id}>
                        <li>
                            <RatingCard showRating rating={index + 1} film={film} />
                        </li>
                    </Link>
                ))}
            </ul>

            {/* Мобильная версия — Swiper */}
            <div className="rating-list__mobile">
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
                    {ratingFilmList.map((film, index) => (
                        <SwiperSlide key={film.id}>
                            <Link to={`/movie/${film.id}`}>
                                <RatingCard showRating rating={index + 1} film={film} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}