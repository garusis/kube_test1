"use strict"
const express = require('express');
const route = express.Router();
const schema = require('schema-object');
const asworkshopModel = require('./assistantworkshop.model');

const Workshop = new schema ({
    assistantId: {type: Number, required:true},
    workshopId: {type: Number, required: true}
})

route.post('/', function(req, res){
    let assistworkshop = new Workshop({
        assistantId : req.assistant.id,
        workshop: req.workshop.id 
    });

    if(assistworkshop.isErrors()){
        return res.status(422).json(assistworkshop.getErrors().map(function(err){
            return {"Error": err.errorMessage, "Name": err.fieldSchema.name}}));
    }
    return asworkshopModel.create(req.body).then(value => res.json(value)).catch(err => res.status(500).send(err.message));
})

route.get('/', function(req, res){
    
})

route.get('/:id', function(req, res){
    
})
    
route.delete('/:id', function(req, res){

})

route.put('/:id', function(req, res){
    
})
