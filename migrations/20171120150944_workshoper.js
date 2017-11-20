
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workshopers', function(attr){
      attr.increments('id').primary();
      attr.string('name').notNull();
      attr.string('photo').nullable();
      attr.string('resume').notNull();
      attr.integer('workshopid').notNull();
      attr.foreign('workshopid').references('workshops.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('workshopers');
};
