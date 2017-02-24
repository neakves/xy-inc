/**
 * Created by Evandro Lira de Souza on 21/02/17.
 */
module.exports = function (app, mongoose) {
    'use strict';

    const defaultSchema = {
        name : {type: String,required: true},
        description : {type: String,required: true},
        category : {type: String,required: true},
        price : {type: Number, required: true}
    };

    function generateModel(name) {
        try {
            if (mongoose.model(name)) {
                return mongoose.model(name);
            }
        } catch(e) {
            if (e.name === 'MissingSchemaError') {
                var schema = new mongoose.Schema(defaultSchema);
                return mongoose.model(name, schema);
            }
        }
    };

    function generateDocument(name, json) {

        var model = generateModel(name);

        var document = new model(json);

        return document;
    };

    app.get('/:model', function (req, res) {

        var name = req.params.model;

        var model = generateModel(name);

        model
            .find(function (err, result) {
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(200);
                    res.json(result);
                }
            });

    });

    app.get('/:model/:id', function (req, res) {

        var name = req.params.model;
        var id = req.params.id;

        var model = generateModel(name);

        model
            .findOne({'_id' : id}, function (err, result) {
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(200);
                    res.json(result);
                }
            });

    });

    app.post('/:model', function (req, res) {

        var name = req.params.model;
        var json = req.body;

        var document = generateDocument(name, json);

        document
            .save(function (err, doc) {
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(201);
                    res.location('/' + name + '/' + doc._id);
                    res.send();
                }
            });

    });

    app.put('/:model/:id', function (req, res) {

        var name = req.params.model;
        var id = req.params.id;
        var json = req.body;

        var model = generateModel(name);

        model
            .findOneAndUpdate({_id: id}, json, function (err, result) {
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(200);
                    res.send();
                }
            });

    });

    app.delete('/:model/:id', function (req, res) {

        var name = req.params.model;
        var id = req.params.id;

        var model = generateModel(name);

        model
            .remove({'_id' : id}, function (err) {
                if(err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(200);
                    res.send();
                }
            });

    });
};