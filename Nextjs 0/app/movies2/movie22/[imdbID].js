import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MovieDetails() {
    const router = useRouter();
    const { imdbID } = router.query; 

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imdbID) return;  

        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=5786ac5b&i=${imdbID}`);
                if (!res.ok) {
                    throw new Error('Falha ao buscar os dados do filme');
                }
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [imdbID]); 

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h1>{movie.Title}</h1>
            <p><strong>Ano:</strong> {movie.Year}</p>
            <p><strong>Gênero:</strong> {movie.Genre}</p>
            <p><strong>Descrição:</strong> {movie.Plot}</p>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        </div>
    );
}
