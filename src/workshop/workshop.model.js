const knex = require('../helpers/knex');
const Workshop = {};

Workshop.create = function(workshop){
    return knex('workshops').insert(workshop);
}
Workshop.findAll = function(query){
    if(!query){
        query={}
    }
    return knex.select('*').from('workshops').where(query);
}
Workshop.find = function(id){
    return Workshop.findAll({id:id}).first();
}
Workshop.remove = function(id){
    return knex('workshops').where({id:id}).del().first();
}
Workshop.update = function(id, body){
    return knex('workshops').where({id:id}).update(body);
}

module.exports = Workshop;