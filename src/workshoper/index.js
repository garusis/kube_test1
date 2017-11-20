"use strict"
const express = require('express');
const route = express.Router();
const schema = require('schema-object');
const _ = require('lodash');
const workshoperModel = require('./workshoper.model');

const Workshoper = new schema ({
    name: {type: String, required:true },
    photo: {type: String},
    resume: {type: String, required:true},
    workshopId: {type: Number, required: true }
})

const Workshoperput = new schema ({
    name: {type: String},
    photo: {type: String},
    resume: {type: String},
    workshopId: {type: Number}
})


route.post('/', function(req, res){
    let workshoper = new Workshoper(req.body);
    workshoper.workshopId = req.workshop.id;
    if(workshoper.isErrors()){
        return res.status(422).json(workshoper.getErrors().map(function(err){
            return {"Error": err.errorMessage, "Name": err.fieldSchema.name}}));
    }
    return workshoperModel.create(req.body).then(newWShoper => res.json(newWShoper)).catch(err => res.status(500).send(err.message));
})

route.get('/', function(req, res){
    if(_.isEmpty(req.query)){
        return workshoperModel.findAll().then( value => res.json(value)).catch(err => res.status(500).send(err.message));
    }
    return workshoperModel.findAll(req.query).then(value => res.json(value)).catch(err=> res.status(500).send(err.message));
})

function instanceValidator(req, res, next){
    workshoperModel.find(req.params.id).then( function (ws){
        if(ws){
            req.workshoper=ws;
            return next();
        }
        return res.sendStatus(404);
    }).catch(err => res.status(500).send(err.message));    
}

route.use('/:id', instanceValidator, instanceRouter);

instanceRouter.get('/', function(req, res){
    return res.json(req.workshoper);
})
    
instanceRouter.delete('/', function(req, res){
    return workshoperModel.remove(req.workshoper.id).then( value => res.json(value)).catch(err=> res.status(500).send(err.message));
})

instanceRouter.put('/', function(req, res){
    let workshopertmp = new Workshoperput(req.body);
    if(workshopertmp.isErrors()){
        return res.status(422).json(workshopertmp.getErrors().map(function(err){
            return {"Error": err.errorMessage, "Name": err.fieldSchema.name}}));
    }
    return workshoperModel.update(req.workshoper.id, req.body).then(value=> res.json(value)).catch(err=>res.status(500).send(err.message));
})


module.exports = route;