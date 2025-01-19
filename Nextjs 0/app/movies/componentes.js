export function MoviesList({ movies }) {
    return (
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <h2>
              {movie.Title} --- {movie.Year}
            </h2>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={`Poster of ${movie.Title}`}
              className="movie-poster"
            />
          </div>
        ))}
      </div>
    );
  }
  