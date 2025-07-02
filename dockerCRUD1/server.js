// env k liye imp
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


const express = require("express");
const app = express();
// const methodOverride = require("method-override");
const cors = require("cors");


const user = require("./routes/user");

app.use(cors());
app.use(express.json());

// app.use(methodOverride("_method"));

// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     host: "localhost",
//     database: "testdb", 
// });


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use("/user",user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
