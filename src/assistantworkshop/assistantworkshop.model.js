const knex = require('../helpers/knex');
const AssistantWorkshop = {};

AssistantWorkshop.create = function(assistwork){
    return knex('assitantworkshop').insert(assistwork);
}
AssistantWorkshop.findAll = function(query){
    if(!query){
        query={}
    }
    return knex.select('*').from('assistantworkshop').where(query);
}
AssistantWorkshop.find = function(id){
    return AssistantWorkshop.findAll({id:id}).first();
}
AssistantWorkshop.remove = function(query){
    return knex('assistantworkshop').where(query).del().first();
}
AssistantWorkshop.update = function(id, body){
    return knex('assistantworkshop').where({id:id}).update(body);
}

module.exports = AssistantWorkshop;