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
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phonenumber: {type: String, unique: true},
    customers: [customerSchemaName], //nieuw
    administrators: [administratorSchemaName],
   // isAdministrator: {type: Boolean, required: true},
    modificationDate: {type: Date, "default": Date.now}
});

/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Relation";
var collectionName = "relations"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);




