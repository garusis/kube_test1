const knex = require('../helpers/knex');
const Assistant = {};

Assistant.create = function(assistant){
    return knex('assitants').insert(assistant);
}
Assistant.findAll = function(query){
    if(!query){
        query={}
    }
    return knex.select('*').from('assistants').where(query);
}
Assistant.find = function(id){
    return Assistant.findAll({id:id}).first();
}
Assistant.remove = function(id){
    return knex('assistants').where({id:id}).del().first();
}
Assistant.update = function(id, body){
    return knex('assistants').where({id:id}).update(body);
}

module.exports = Asistant;