/**
 * Module dependencies.
 */
var mongoose;

mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocuments @ http://mongoosejs.com/docs/subdocs.html

/* Sub Schema definitions */
var administratorSchemaName = Schema({
    isAdministrator: {type: Boolean}
});

/* Sub Schema definitions */
// Joins @ http://mongoosejs.com/docs/populate.html
var customerSchemaName = Schema({
    products: [
        {type: Schema.Types.ObjectId, ref: 'Product'}
    ],
    transactions: [
        {type: Schema.Types.ObjectId, ref: 'Transaction'}
    ]

});

/* Schema definitions */
var schemaName = Schema({
   // id: {type: Number, required: true},
    make: {type: String, required: true},
    style: {type: String, required: true},
    fuel: {type: String, required: true},
    engine: {type: Number, required: true} ,
    power: {type: Number, required: true} ,
    year: {type: Number, required: true},
    color: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    //nieuw 02-05
    modificationDate: {type: Date, "default": Date.now}
    //

});

/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Car";
var collectionName = "cars"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);




