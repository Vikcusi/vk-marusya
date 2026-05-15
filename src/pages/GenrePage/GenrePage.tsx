import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { genreFilm } from "../../api/Movie";
import { GenreList } from "../../components/GenreList/GenreList";


export const GenrePage = () => {

    const genreQuery = useQuery({
        queryKey: ["genreList"],
        queryFn: genreFilm,
    }, queryClient);

     
    const { data  } = genreQuery;

    return (
        <div>
            <GenreList genreList={data ?? []} />
        </div>
    )
}