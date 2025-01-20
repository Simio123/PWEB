"use client";
import useSWR from 'swr';
import Link from 'next/link';

async function fetcher(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Falha ao buscar os dados');
        }
        const json = await res.json();
        return json;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export default function Movies2() {
    const { data, error } = useSWR('http://www.omdbapi.com/?apikey=5786ac5b&s=bagdad', fetcher);

    if (error) return <div>Falha na requisição...</div>;

    if (!data) return <div>Carregando...</div>;

    return (
        <div>
            {data.Search ? (
                data.Search.map((m) => (
                    <div key={m.imdbID}>
                        <Link href={`/movie22/${m.imdbID}`}>
                            {m.Title} --- {m.Year}
                        </Link>
                    </div>
                ))
            ) : (
                <div>Nenhum filme encontrado</div>
            )}
        </div>
    );
}
