let mongoose = require("mongoose");
let Promise = require('bluebird');
mongoose.Promise = Promise;

//Dependencias de desenvolvimento
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

const defaultSchema = {
    name : {type: String},
    description : {type: String},
    category : {type: String},
    price : {type: Number}
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

chai.use(chaiHttp);


describe('Carros', () => {

    /*
     * Test the /GET route
     */
    describe('/GET Carros', () => {
        it('deve pegar todos Carros', (done) => {
            chai.request(server)
                .get('/Carros')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});