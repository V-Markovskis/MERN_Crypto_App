const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require("mongodb");

//init app & middleware
const app = express();

//middleware - convert received data from JSON to JS object
app.use(express.json())

//db connection
let db;
connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
        //return db connection object
        db = getDb();
    }
})

// routes
app.get('/assets', (req, res) => {
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

app.get('/assets/:id',(req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .findOne({_id: ObjectId(req.params.id)}) //CHECK HERE LATER
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

app.post('/assets', (req, res) => {
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

app.delete('/assets/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .deleteOne({_id: ObjectId(req.params.id)}) //CHECK HERE LATER
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

app.patch('/assets/:id', (req, res) => {
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)) {
        db.collection('assets')
            .update({_id: ObjectId(req.params.id)}, {$set: updates}) //CHECK HERE LATER
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