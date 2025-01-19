import { MoviesList } from "./componentes";
import "./estilos.css";

export default async function Home({ searchParams }) {
  const {
    titleSearchKey = "bagdad",
    type = "",
    year = "",
    plot = "short",
    page = 1,
  } = searchParams;

  const queryParams = new URLSearchParams({
    apikey: "5786ac5b",
    s: titleSearchKey,
    type,
    y: year,
    plot,
    page,
  });

  const res = await fetch(`http://www.omdbapi.com/?${queryParams}`);
  const data = await res.json();

  return (
    <div className="container">
      <header className="header">
        <h1>Filmes e Séries</h1>
      </header>
      <main className="main-content">
        {data.Search ? (
          <MoviesList movies={data.Search} />
        ) : (
          <p className="no-results">
            Nenhum resultado encontrado. Tente ajustar sua busca!
          </p>
        )}
      </main>
      <footer className="footer">
        <p>© 2025 - App de Filmes</p>
      </footer>
    </div>
  );
}
