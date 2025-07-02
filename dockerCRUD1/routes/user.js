const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// add user
router.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = await prisma.users.create({
        data:{name, email, age}
    });
    res.status(201).json(user);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// get single user by id
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const user = await prisma.users.findUnique({
            where:{id:parseInt(id)}
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// get all users
router.get("/", async(req, res) => {
    try {
        const user = await prisma.users.findMany();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// edit user by id
router.patch("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const { name, email, age } = req.body;

        const user = await prisma.users.update({
            where:{ id:parseInt(id)},
            data:{name, email, age}
        })

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const user = await prisma.users.delete({
            where:{id:parseInt(id)}
        })

        res.status(200).send("user deleted");
    } catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = router;