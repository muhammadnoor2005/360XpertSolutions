const express = require("express");
const router = express.Router();

const pool = require("../db/db");

// add user
router.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// get single user by id
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if(result.rows.length == 0){
            return res.status(404).send("User not found");
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// get all users
router.get("/", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// edit user by id
router.patch("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const { name, email, age } = req.body;

        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, age= $3 WHERE id = $4 RETURNING *",
            [name, email, age, id]
        );

        if(result.rows.length == 0){
            return res.status(404).send("user not found")
        }

        res.status(200).send(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            "DELETE FROM users WHERE id=$1 RETURNING *",
            [id]
        );

        if(result.rows.length == 0){
            return res.status(404).send("user not found!");
        }

        res.status(200).send(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message)
    }
})
module.exports = router;