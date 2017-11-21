"use strict"

const express = require('express');
const route = express.Router();
const instanceRouter = express.Router();
const schema = require('schema-object');
const _ = require('lodash');
const workshopModel = require('./workshop.model');
const workshoper = require('../workshopers');
const asstworkshop = require('../assistantworkshop');

const Workshop = new schema ({
    tittle: {type: String, required:true },
    room: {type: String, required:true, enum: ["AS404", "AS410", "Auditorio"]},
    time: {type: Date, required: true },
    capacity: {type: Number, required: true}
})
const Workshoput = new schema ({
    tittle: {type: String},
    room: {type: String, enum: ["AS404", "AS410", "Auditorio"]},
    time: {type: Date},
    capacity:{type: Number}
})
//Validate if two workshops are programmed at the same time
//A workshop should have a capacity
route.post('/', function(req, res){
    let workshop = new Workshop(req.body);
    if(workshop.isErrors()){
        return res.status(422).json(workshop.getErrors().map(function(err){
            return {"Error": err.errorMessage, "Name": err.fieldSchema.name}}));
    }
    workshopModel.find({room: req.body.room, time: req.body.time}).then(function(wshop){
        if(wshop){
            return res.status(422).json([{ "message": "Room not available at this time", "name": "room, time" }]);
        }
        return workshopModel.create(req.body).then(newWShop => res.json(newWShop));
    }).catch(err=> res.status(500).send(err.message));
    
})

route.get('/', function(req, res){
    if(_.isEmpty(req.query)){
        return workshopModel.findAll().then( value => res.json(value)).catch(err => res.status(500).send(err.message));
    }
    return workshopModel.findAll(req.query).then(value => res.json(value)).catch(err=> res.status(500).send(err.message));
})

function instanceValidator(req, res, next){
    
    let workshoptmp = {};
    workshopModel.find(req.params.id).then( function (ws){
        if(ws){
            req.workshop=ws;
            return next();
        }
        
        return res.sendStatus(404);
    }).catch(err => res.status(500).send(err.message));    
}

route.use('/:id', instanceValidator, instanceRouter);

instanceRouter.get('/', function(req, res){
    return res.json(req.workshop);
})
    
instanceRouter.delete('/', function(req, res){
    return workshopModel.remove(req.workshop.id).then( value => res.json({"message":"Workshop deleted"})).catch(err=> res.status(500).send(err.message));
})

instanceRouter.put('/', function(req, res){
    let workshoptmp = new Workshoput(req.body);
    if(workshoptmp.isErrors()){
        return res.status(422).json(workshoptmp.getErrors().map(function(err){
            return {"Error": err.errorMessage, "Name": err.fieldSchema.name}}));
    }
    return workshopModel.update(req.workshop.id, req.body).then(value=> res.json(value)).catch(err=>res.status(500).send(err.message));
})

instanceRouter.use("/workshopers", workshoper);
instanceRouter.use("/assitants", asstworkshop);

module.exports = route;