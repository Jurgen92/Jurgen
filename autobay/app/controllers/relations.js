var mongoose = require('mongoose'), Relation = mongoose.model('Relation'), passwordHash = require('password-hash');


// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    // Encrypt password console.log("doc!!!:" + doc);
    doc = {};
    err.userExist = false;
    req.body.password = passwordHash.generate(req.body.password);

    var doc = new Relation(req.body);

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

    Relation
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

/*
exports.detail = function (req, res) {
    var conditions, fields, options;

    conditions = {"name":req.params.name}
        , fields = {}
        , options = {'createdAt': -1};

    Relation
        .find(conditions, fields, options)
        //.sort({'createdAt': -1})// sort by date
        .exec(function (err, doc) {
            console.log(doc);

            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), "conditions": conditions},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}
*/

exports.detail = function (req, res) {
    var conditions, fields, options;

    conditions = {name: req.params.name}
        , fields = {}
        , options = {'createdAt': -1};

    Relation
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            console.log('doc: ', doc);
            console.log(req.params.password);
            console.log(doc[0].password);
            err={};
            if (passwordHash.verify(req.params.password, doc[0].password)) {
                err.userExist = true;

            } else {
                console.log("doc!!!:" + doc);
                doc = {};
                err.userExist = false;
            }

            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), "conditions": conditions},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}

// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
exports.update = function (req, res) {

    var conditions =
        {email: req.params.email}
        , update = {
            name: req.body.name}
        , options = { multi: true }
        , callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        }

    Relation.findOneAndUpdate(conditions, update, options, callback);
}


// DELETE
// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
exports.delete = function (req, res) {
    var conditions, callback;

    conditions = {_id: req.params.id}
        , callback = function (err, doc) {
        var retObj = {
            meta: {"action": "delete", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }

    Relation.remove(conditions, callback);
}