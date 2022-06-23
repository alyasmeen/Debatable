/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable("debates", function(table){
      table.uuid('id').primary().notNullable()
      .defaultTo(knex.raw('uuid_generate_v1()') )

      table.string('title').notNullable().unique();
      table.string('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
