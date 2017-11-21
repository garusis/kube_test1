"use strict"
const express = require('express');
const route = express.Router();
const schema = require('schema-object');
const asworkshopModel = require('./assistantworkshop.model');
const assistantModel = require('../assistants/assistant.model');
const workshopModel = require('../workshops/workshop.model')

route.post('/', function(req, res){
    //esta estudiante, si está inscrito menos de tres veces, capacidad de inscritos
    return assistantModel.find(req.body.assistantId).then(function(assistant){
        if(!assistant){
            return res.status(404).send("Assistant not found");
        }
        return asworkshopModel.find({assistantid: req.body.assistantId, workshopid: req.workshop.id}).then(function(assiworkshop){
            if(assiworkshop){
                return res.status(422).send("Already in this workshop");
            }
            return asworkshopModel.findAll({assistantid:req.body.assistantId}).then(function(assistList){
                if(assistList.lenght>=3){
                    return res.status(422).send("Assistant have reached the full workshops");
                }
                return asworkshopModel.findAll({workshopid:req.workshop.id}).then(function(workshopList){
                    if(workshopList.lenght>=req.workshop.capacity){
                        return res.status(422).send("Workshop reached full capacity");
                    }
                    return asworkshopModel.create({assistantid: req.body.assistantId, workshopid: req.workshop.id}).then(value=> send.json(value));
                });
            });
            
        });
        
    }).catch(err=> res.status(500).send(err.message));    
})

route.get('/', function(req, res){
    return assistantModel.findAll({workshopid:req.workshop.id}).then(value => res.json(value)).catch(err=> res.status(500).send(err.message));
})

route.get('/:assistantId', function(req, res){
    return assistantModel.find({workshopid:req.workshop.id, assistantid: req.params.assistantId}).then(value => res.json(value)).catch(err=> res.status(500).send(err.message));
})
    
route.delete('/:assistantid', function(req, res){
    return asworkshopModel.remove({assistantid:req.params.assistantid, workshopid: req.workshop.id}).then(assist => res.json(assist)).catch(err=> res.status(500).send(err.message))
})


module.exports = route;