let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.gsgg2xt.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/cats', (req, res) => {
    getAllCats((err,result) => {
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all cats success'});
        }
    });
});

app.post('/api/cat', (req, res) => {
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback);
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}

app.listen(3000, ()=>{
    console.log('express server started');
    runDBConnection();
}); 
