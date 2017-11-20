
exports.up = function(knex, Promise) {
  return knex.schema.createTable('assistants', function(attr){
      attr.increments('id').primary();
      attr.string('name').notNull();
      attr.string('photo').nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assistants');
};
