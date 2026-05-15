import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { movie,  } from "../../api/Movie";
import { CertainGenreList } from "../../components/CertainGenreList/CertainGenreList";
import { Loader } from "../../components/Loader/Loader";

export const CertainGenrePage = () => {

    const filmQuery = useQuery({
        queryKey: ["filmList"],
        queryFn: movie,
    }, queryClient);

    const { data: films, isLoading, isError, error } = filmQuery;

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Ошибка загрузки фильмов: {error.message}</div>;
    }
    return (
        <>
            <CertainGenreList filmList={films ?? []} />
        </>
    )
}