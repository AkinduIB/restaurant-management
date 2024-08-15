const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 6001;
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());


//mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@labellapizza-cluster.pjrnw.mongodb.net/?retryWrites=true&w=majority&appName=LaBellaPizza-cluster`;

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
    await client.connect();

    //database & collections
    const menuCollections = client.db("LaBellaPizza-db-client").collection("menus");
    const cartCollections = client.db("LaBellaPizza-db-client").collection("cartItems");

    // all menu items operations
    app.get('/menu', async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result)
    })

    //all carts operations
    // posting cart to db
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    //get carts using email
    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollections.find(filter).toArray();
      res.send(result)
    })

    //get specific carts
    app.get("/carts/:id", async (req, res) => {
      try {
        const id = req.params.id;

        // Check if the id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: 'Invalid ID format' });
        }

        const filter = { _id: new ObjectId(id) };
        const result = await cartCollections.findOne(filter);

        // Handle the case where no document was found
        if (!result) {
          return res.status(404).send({ error: 'Cart not found' });
        }

        res.send(result);
      } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).send({ error: 'An error occurred while retrieving the cart' });
      }
    });

    //delete items from cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(filter);

      if (result.deletedCount === 0) {
        return res.status(404).send({ error: 'Cart item not found' });
      }

      res.send({ message: 'Item successfully deleted', deletedCount: result.deletedCount });
    });


    //update cart quantity
    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10)
        },
      };
      const result = await cartCollections.updateOne(filter, updateDoc, options);
    });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})