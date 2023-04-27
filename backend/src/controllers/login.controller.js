import { pool } from "../db.js";

export const getLogin = (req, res) => {
  res.render("login");
};

export const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).send("<h1>Email o password incorrectos</h1>");
    }

    return res.redirect("/index");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error occurred while logging in");
  }
};
