
exports.up = function(knex, Promise) {
  return knex.schema.createTable('assistantworkshop', function(attr){
      attr.increments('id').primary();
      attr.integer('workshopid').notNull();
      attr.foreign('workshopid').references('workshops.id');
      attr.integer('assistantid').notNull();
      attr.foreign('assistantid').references('assistants.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assistantworkshop');
};
