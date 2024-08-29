const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
const cors = require('cors')
client.connect();

const app = express();

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
