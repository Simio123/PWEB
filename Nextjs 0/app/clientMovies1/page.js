"use client";

import React, { useState, useCallback } from "react";
import "./estilos.css";

export default function Home() {
  const [resultMovies, setResultMovies] = useState([]);
  const [titleSearchKey, setTitleSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const httpRes = await fetch(`http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`);
      const jsonRes = await httpRes.json();
      setResultMovies(jsonRes.Search || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);
      setTitleSearchKey("");  
    }
  }, [titleSearchKey]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Buscador de Filmes</h1>
      <MovieForm
        handleAction={handleAction}
        titleSearchKey={titleSearchKey}
        setTitleSearchKey={setTitleSearchKey}
        isLoading={isLoading}
      />
      <MovieTable movies={resultMovies} />
    </div>
  );
}

const MovieForm = React.memo(({ handleAction, titleSearchKey, setTitleSearchKey, isLoading }) => {
  console.log("Rendering MovieForm");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!isLoading) {
        handleAction(event);
      }
    }
  }

  return (
    <form onSubmit={handleAction} className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 mb-6">
      <div className="mb-4">
        <label htmlFor="idTitleSearchKey" className="block text-gray-700 font-bold mb-2">
          Título
        </label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          value={titleSearchKey}
          onChange={(e) => setTitleSearchKey(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Pesquisando..." : "Pesquisar"}
      </button>
    </form>
  );
});

const MovieTable = ({ movies }) => {
  console.log("Rendering MovieTable");

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 py-6">
      {movies.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Título</th>
              <th className="border border-gray-300 px-4 py-2">Ano</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.imdbID} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{m.Title}</td>
                <td className="border border-gray-300 px-4 py-2">{m.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700 text-center">Nenhum filme encontrado.</p>
      )}
    </div>
  );
};
