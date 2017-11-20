
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workshops', function(attr){
    attr.increments('id').primary();
    attr.string('tittle').notNull();
    attr.enum('room', ["AS404", "AS410", "Auditorio"]).notNull();
    attr.dateTime('time').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('workshops');
};
