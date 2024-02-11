const express = require('express')
const { connectToDb, getDb } = require('../server')
const cors = require('cors')
const { ObjectId } = require("mongodb");

//init app & middleware
const app = express();

// const corsOptions = {
//     origin: ['http://localhost:5173', process.env.VERCEL_URI],
//     methods: ['POST', 'GET', 'DELETE', 'PATCH'],
//     credentials: true
// };
//
// app.use(cors(corsOptions));

app.use(cors());

//middleware - convert received data from JSON to JS object
app.use(express.json())

//db connection
let db;
connectToDb((err) => {
    if(!err) {
        app.listen(8080, () => {
            console.log('app listening on port 8080');
        });
        //return db connection object
        db = getDb();
    }
})

// routes
// app.get('/assets', (req, res) => {
//     let assets = [];
//
//     db.collection('assets')
//         .find() //cursor - object that essentially points to a set of documents outlined by our query
//         .forEach(asset => assets.push(asset))
//         .then(() => {
//             res.status(200).json(assets);
//         })
//         .catch(() => {
//             res.status(500).json({error: 'Could not fetch data'});
//         })
// })
app.get('/', (req, res) => {
    let assets = [];

    db.collection('assets')
        .find() //cursor - object that essentially points to a set of documents outlined by our query
        .forEach(asset => assets.push(asset))
        .then(() => {
            res.status(200).json(assets);
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch data'});
        })
})

app.get('/:id',(req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .findOne({_id: new ObjectId(req.params.id)}) //CHECK HERE LATER
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({error: 'Could not fetch data'});
            })
    } else {
        res.status(500).json({error: 'Not a valid document ID'})
    }
})

app.post('/', (req, res) => {
    const book = req.body;

    db.collection('assets')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new asset'})
        })
})

app.delete('/:id', (req, res) => {
    // console.log('delete request', req.params.id);

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .deleteOne({_id: new ObjectId(req.params.id)}) //CHECK HERE LATER
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({error: 'Could not delete asset'});
            })
    } else {
        res.status(500).json({error: 'Not a valid document ID'})
    }
})

app.patch('/:id', (req, res) => {
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .update({_id: new ObjectId(req.params.id)}, {$set: updates}) //CHECK HERE LATER
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update asset'});
            })
    } else {
        res.status(500).json({error: 'Not a valid document ID'})
    }
})