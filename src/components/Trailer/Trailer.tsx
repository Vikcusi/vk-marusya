import { useEffect, useRef, useState, type FC } from "react"
import type { Movie } from "../../api/Movie"
import IconCross from "../../assets/icon/cross.svg"
import IconPlay from "../../assets/icon/player-run.svg"
import IconStop from "../../assets/icon/player-stop.svg"
import "./Trailer.css"

interface TrailerProps {
    film: Movie,
    onClose: () => void
}

export const Trailer: FC<TrailerProps> = ({ film, onClose }) => {
    const videoRef = useRef<HTMLIFrameElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const pauseVideo = () => {
        if (videoRef.current) {
            const src = videoRef.current.src;
            videoRef.current.src = src.replace('autoplay=1', 'autoplay=0');
            setIsPlaying(false);
        }
    };

    const playVideo = () => {
        if (videoRef.current) {
            const src = videoRef.current.src;
            videoRef.current.src = `${src}&autoplay=1`;
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 500);
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);


    return (
        <div className="trailer">
            <div className="trailer__window" onMouseEnter={pauseVideo}>
                <iframe
                    className="trailer__video"
                    ref={videoRef}
                    src={`${film.trailerUrl}&playsinline=1&autoplay=1&controls=0`}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                ></iframe>
                {isLoading && (
                    <span className="loader"></span>
                )}
                <button className="trailer__close-icon" onClick={onClose}>
                    <img className="trailer__icon" src={IconCross} alt="Закрыть" />
                </button>
                <button
                    className={`trailer__play-btn trailer__pause-icon ${isPlaying ? 'visible' : ''}`}
                    onClick={pauseVideo}
                    style={{ display: isPlaying ? 'block' : 'none' }}
                >
                    <img className="trailer__icon-play" src={IconPlay} alt="Остановить" />
                </button>
                <button
                    className={`trailer__play-btn trailer__resume-icon ${!isPlaying ? 'visible' : ''}`}
                    onClick={playVideo}
                    style={{ display: !isPlaying ? 'block' : 'none' }}
                >
                    <img className="trailer__icon-play" src={IconStop} alt="Начать играть" />
                </button>
                <div className="trailer__title">
                    <p className="trailer__text">{film.title}</p>
                </div>
            </div>
        </div>
    )
}