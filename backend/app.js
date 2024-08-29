const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");
const cors = require('cors')
client.connect();

const app = express();

app.use(express.static(__dirname + "/frontend"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin:"*"
}))

app.post("/submit", async (req, res) => {
  const { name, price, photo } = req.body;
  const db = client.db("products");
  await db.collection("products").insertOne({ name, price, photo });

  res.send(`Received data - Name: ${name}, Price: ${price}, photo${photo}`);
});

app.get('/', async (req, res) => {
        res.sendFile(__dirname + "/frontend/index.html");
});

app.get("/all", async (req, res) => {
    try {
        const db = client.db("products");
        const products = db.collection("products");
        const data = await products.find().toArray();
        res.send(data);

    } catch (err){
        console.log(err, "data error")
    }
});

const PORT = 3022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});