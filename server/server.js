import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.listen(8080, () => {
  console.log("Server is running!");
});

app.get("/", (request, response) => {
  response.json({ message: "Welcome to the root route!" });
});

app.get("/secrets", async (request, response) => {
  const query = await db.query("SELECT * FROM secrets");
  const data = response.json(query.rows);
  console.log(data);
});

app.post("/newSecret", (request, response) => {
  const body = request.body;
  const query = db.query(
    "INSERT INTO secrets (alias, secret, secrettype) VALUES ($1, $2, $3)",
    [body.alias, body.secret, body.secrettype]
  );
  response.json(query);
});
