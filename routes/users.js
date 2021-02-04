const { request } = require('express');
const { check, validationResult } = require("express-validator");
let NeDB = require('nedb');

let database = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = function(app){

    let route = app.route('/users');

    route.get((request, response)=>{

        database.find({}).sort({name:1}).exec((err, users) =>{
            if(err){
                app.utils.error.send(err, request, response);
            }
            else{
                response.statusCode = 200;
                response.setHeader('Content-type', 'application/json');
                response.json({users}); 
            }

        });

        
    });
    
    
    route.post([
            check('nome', 'O nome é obrigatório').notEmpty(),
            check('email', "O email é obrigatório").notEmpty().isEmail()
                ], (request, response)=>{
                
            
            let errors = validationResult(request);

            if(!errors.isEmpty())
            {
                app.utils.error.send(errors, request, response);
                return false;
            }
            database.insert(request.body, (err, userData)=>{

            if(err)
            {
                app.utils.error.send(err, request, response);
            }
            else{
                response.status(200).json(userData);
            }
        })
    });

    let routeID = app.route('/users/:id');

    routeID.get((request, response)=>{
        database.findOne({_id: request.params.id}).exec((error, userData)=>{
            if(error)
            {
                app.utils.error.send(error, request, response);
            }
            else{
                response.status(200).json(userData);
            }
        });
    });

    routeID.put((request, response)=>{
        database.update({_id: request.params.id}, request.body, error =>{
            if(error)
            {
                app.utils.error.send(error, request, response);
            }
            else{
                response.status(200).json(Object.assign(request.params, request.body));
            }
        });
    });

    routeID.delete((request, response) => {
        database.remove({_id: request.params.id}, {}, error =>{
            if(error)
            {
                app.utils.error.send(error, request, response);
            }
            else
            {
                response.status(200).json(request.params);
            }
        });
    })
};