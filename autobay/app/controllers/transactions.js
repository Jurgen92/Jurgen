var mongoose = require('mongoose'), Transaction = mongoose.model('transaction'), passwordHash = require('password-hash');

/**
 *  CREATE
 *  ------
 *  save
 *  @see http://mongoosejs.com/docs/api.html#model_Model-save
 */


exports.create = function (req, res) {

    // Encrypt password
   // req.body.password = passwordHash.generate(req.body.password);

    var doc = new Transaction(req.body);
    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    });
}



/**
 *  RETRIEVE
 *  --------
 *  find
 *  @see http://mongoosejs.com/docs/api.html#model_Model.find
 */
exports.list = function (req, res) {
    var conditions, fields, options;
 
    conditions = {};
    fields = {};
    options = {'createdAt': -1};
 
    Transaction
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "list", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}
 
exports.detail = function (req, res) {
    var conditions, fields, options;
 
    conditions = {"productId":req.params.productId}
        , fields = {}
        , options = {'createdAt': -1};
 
    Transaction
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "detail", "timestamp": new Date(), "conditions": conditions},
                doc: doc[0],
                err: err
            };
            console.log(retObj);
            return res.send(retObj);
        })
};
 
/**
 *  UPDATE
 *  ------
 *  findOneAndUpdate
 *  @see http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
 */
exports.update = function (req, res) {
 
    var conditions =
        {"productId":req.params.productId}
        , update = {

           // productId: req.body.productId,
            //bids: req.body.bid,
            bids: [{
                relationId: req.body.relationId,
                bid: req.body.bid
            }]
           // status: req.body.status
            }
        , options = { multi: true }
        , callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        }
 
    Transaction.findOneAndUpdate(conditions, update, options, callback);
}
 
/**
 *  DELETE
 *  ------
 *  remove
 *  @see http://mongoosejs.com/docs/api.html#model_Model-remove
 */
exports.delete = function (req, res) {
    var conditions, callback;
 
    conditions = {_id: req.params.id}
        , callback = function (err, doc) {
        var retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), "conditions": conditions},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }
 
    Transaction.remove(conditions, callback);
}
