const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5001

// middlewares 
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('library Management system Server is running')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Library024:NoifoBZmF7tNeWzs@mostofa.3njni9a.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // bookServer 
    const BookDataCollection = client.db('cartDB').collection('cart')

    app.post('/books', async (req, res) => {
        const newAddCart = req.body
        const result = await BookDataCollection.insertOne(newAddCart)
        res.send(result)

    })
    // 
    app.get('/books', async (req, res) => {
        const cursor = BookDataCollection.find()
        const result = await  cursor.toArray()
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`library system Management is Running Port: ${port}`)
})
