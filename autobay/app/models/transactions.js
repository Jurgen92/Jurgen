/**
 * Module dependencies.
 */
var mongoose;
mongoose = require('mongoose'), Schema = mongoose.Schema;
 
/**
 *  Subdocuments
 *  ------------
 *  @see http://mongoosejs.com/docs/subdocs.html
 */

/* Schema definitions */
var schemaName = Schema({
    productId: {type: String, required: true}, //deze

    phonenumber: {type: String, required: true}, //deze

   // bid: {type: Number, required: true},
    //car: {type: Schema.Types.ObjectId, ref: 'Car'},
    //relation: {type: Schema.Types.ObjectId, ref: 'Relation'},

    bid: {type: Number, required: true}, //deze

    status: {type: String},
    date: {type: Date, "default": Date.now}
});


 
/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "transaction";
var collectionName = "transactions"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);