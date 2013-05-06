var mongoose = require('mongoose'), Car = mongoose.model('Car'), passwordHash = require('password-hash');

// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    // Encrypt password
    //req.body.password = passwordHash.generate(req.body.password);

    var doc = new Car(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    });

}

// RETRIEVE
// find @ http://mongoosejs.com/docs/api.html#model_Model.find
exports.list = function (req, res) {
    var conditions, fields, options;

    conditions = {};
    fields = {};
    options = {'createdAt': -1};

    Car
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

    conditions = {"_id":req.params._id}
        , fields = {}
        , options = {'createdAt': -1};

    Car
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


// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
exports.update = function (req, res) {

    var conditions =
        {"_id": req.params._id}
        , update = {
            id: req.body.id,
            make: req.body.make,
            style: req.body.style,
            fuel: req.body.fuel,
            engine: req.body.engine,
            power: req.body.power,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            status: req.body.status,
            modificationDate: req.body.modificationDate

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

    Car.findOneAndUpdate(conditions, update, options, callback);
}

// DELETE
// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
exports.delete = function (req, res) {
    var conditions, callback;

    conditions = {"_id": req.params._id}
        , callback = function (err, doc) {
        var retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), "conditions": conditions},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }


    Car.remove(conditions, callback);
}

/**
 * Created with JetBrains PhpStorm.
 * User: Jurgen
 * Date: 2-4-13
 * Time: 11:40
 * To change this template use File | Settings | File Templates.
 */
