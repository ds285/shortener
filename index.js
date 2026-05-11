const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const urlDatabase = {};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/shorten", (req, res) => {

  const { url } = req.body;

  if(!url){
    return res.status(400).json({
      error:"URL required"
    });
  }

  const shortCode = nanoid(6);

  urlDatabase[shortCode] = url;

  res.json({
    shortCode
  });
});

app.get("/:code", (req, res) => {

  const originalURL = urlDatabase[req.params.code];

  if(originalURL){
    return res.redirect(originalURL);
  }

  res.send("Link not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});