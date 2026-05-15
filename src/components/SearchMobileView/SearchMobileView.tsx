import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "../../api/queryClient";
import { FormField } from "../FormField/FormField";
import IconSearch from "../../assets/icon/change/search/IconSearch";
import { SearchFilmList } from "../SearchFilmList/SearchFilmList";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { movie, type Movie } from "../../api/Movie";
import "./SearchMobileView.css"

interface SearchMobileViewProps {
    onClose: () => void;
    inputRef: React.RefObject<HTMLInputElement> | null;
}

export const SearchMobileView: FC<SearchMobileViewProps> = ({onClose, inputRef}) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [isOpen, setIsOpen] = useState(true);

    const searchName = searchParam.get("searchName") || "";

    const filmQuery = useQuery({
        queryKey: ["searchFilms"],
        queryFn: movie,
    }, queryClient);

    const films: Movie[] = filmQuery.data ?? [];

    const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam({
            searchName: value.toLowerCase(),
        });
    };

    const onCloseHandler = () => {
        setIsOpen(false);
        onClose();
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!document.activeElement?.closest('.search-mobile')) {
                onCloseHandler();
            }
        }, 100);
    };

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    return (
        <div className="search-mobile">
            <div className="search-mobile__wrapper">
                <FormField theme="dark" svgIcon={<IconSearch />}>
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="Поиск"
                        value={searchName}
                        onChange={handleSearchName}
                        onBlur={handleBlur}
                    />
                    {searchName && <SearchFilmList searchFilms={films} searchName={searchName} onMovieClick={onCloseHandler} />}
                </FormField>
            </div>
        </div >
    )
}