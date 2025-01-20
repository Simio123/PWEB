import db from "@/lib/db";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const titleSearchKey = searchParams.get("titleSearchKey")?.toLowerCase() || "";

  const stmt = db.prepare(`
    SELECT title, year, imdbID 
    FROM movies 
    WHERE LOWER(title) LIKE ?
    LIMIT 10
  `);
  const movies = stmt.all(`%${titleSearchKey}%`);

  return Response.json({ Search: movies });
}

export async function POST(request) {
  const { title, year, imdbID } = await request.json();

  try {
    const stmt = db.prepare(`
      INSERT INTO movies (title, year, imdbID)
      VALUES (?, ?, ?)
    `);
    stmt.run(title, year, imdbID);

    return new Response("Filme inserido com sucesso!", { status: 201 });
  } catch (error) {
    console.error("Erro ao inserir filme:", error);
    return new Response("Erro ao inserir filme", { status: 500 });
  }
}
