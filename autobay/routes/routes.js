module.exports = function (app) {

    /*  Relation routes
        ---------------
        We create a variable "relations" that holds the controller object.
        We map the URL to a method in the created variable "relations".
        In this example is a mapping for every CRUD action.
     */
    var relations = require('../app/controllers/relations.js');
    // CREATE
    app.post('/relation/', relations.create);
    // RETRIEVE
    app.get('/relations', relations.list);
    //app.get('/relation/:name', relations.detail);
    app.get('/relation/:name/:password', relations.detail);
    // UPDATE
    app.put('/relation/:email', relations.update);
    // DELETE
    app.delete('/relation/:email', relations.delete);

    /*  Car routes
     ---------------
     We create a variable "cars" that holds the controller object.
     We map the URL to a method in the created variable "cars".
     In this example is a mapping for every CRUD action.
     */
    var cars = require('../app/controllers/cars.js');

    // ADMIN
   // app.get("/admin/cars",  ensureAuthenticated, cars.adminList);
   // app.get("/admin/cars/:id",  ensureAuthenticated, cars.detail);
    // ...

    // CREATE
     app.post('/car/', cars.create);
    // RETRIEVE
    app.get('/cars', cars.list);
   // app.get('/cars/:id', cars.detail);
    app.get('/cars/:_id', cars.detail);
    // UPDATE
    //app.put('/car/:id', cars.update);
    app.put('/car/:_id', cars.update);
    // DELETE
    //app.delete('/car/:id', cars.delete);
    app.delete('/car/:_id', cars.delete);

    /*  Transaction routes
     ---------------
     We create a variable "transactions" that holds the controller object.
     We map the URL to a method in the created variable "transactions".
     In this example is a mapping for every CRUD action.
     */
    var transactions = require('../app/controllers/transactions.js');
    // CREATE
    app.post('/transaction/', transactions.create);
    // RETRIEVE
    app.get('/transactions', transactions.list);
    //app.get('/transactions/:productId', transactions.detail);
   //oude// app.get('/transactions/:phonenumber', transactions.detail);
    app.get('/transactions/:productId', transactions.detail);
    // app.get('/cars/:id', cars.detail);
    //app.get('/transactions/:_id', cars.detail);
    // UPDATE
    //app.put('/car/:id', cars.update);
    app.put('/transaction/:productId', transactions.update);
    // DELETE
    app.delete('/transaction/:_id', transactions.delete);
    //app.delete('/car/:_id', cars.delete);
 
  


    /*  User routes
     ---------------
     We create a variable "users" that holds the controller object.
     We map the URL to a method in the created variable "users".
     In this example is a mapping for every CRUD action.
     */
    //var users = require('../app/controllers/users.js');
    // CREATE
    //app.post('/user/', users.create);
    // RETRIEVE
   // app.get('/users', users.list);

   // app.get('/user/:email', users.detail);
    // UPDATE
   // app.put('/user/:email', users.update);
    // DELETE
    //app.delete('/user/:email', users.delete);

}


