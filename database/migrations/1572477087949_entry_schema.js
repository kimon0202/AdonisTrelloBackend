'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntrySchema extends Schema {
  up () {
    this.create('entries', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('board_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('boards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('body').notNullable();
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
