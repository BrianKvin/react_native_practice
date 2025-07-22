// test.js
import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Hello World"));
app.listen(3000, () => console.log("Test server running on 3000"));
