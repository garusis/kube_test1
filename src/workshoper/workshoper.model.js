const knex = require('../helpers/knex');
const Workshoper = {};

Workshoper.create = function(assistant){
    return knex('workshopers').insert(assistant);
}
Workshoper.findAll = function(query){
    if(!query){
        query={}
    }
    return knex.select('*').from('workshopers').where(query);
}
Workshoper.find = function(id){
    return Workshoper.findAll({id:id}).first();
}
Workshoper.remove = function(id){
    return knex('workshopers').where({id:id}).del().first();
}
Workshoper.update = function(id, body){
    return knex('workshopers').where({id:id}).update(body);
}

module.exports = Workshoper;