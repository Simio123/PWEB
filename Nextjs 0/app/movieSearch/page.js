import Form from "next/form";

export default async function MovieForm() {
  return (
    <Form action="/movies">
      <label htmlFor="idTitleSearchKey">Título</label>
      <input id="idTitleSearchKey" name="titleSearchKey" />

      <label htmlFor="idGenreSearchKey">Gênero</label>
      <input id="idGenreSearchKey" name="genreSearchKey" />

      <button type="submit">Pesquisar</button>
    </Form>
  );
}
