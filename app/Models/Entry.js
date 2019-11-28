'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entry extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  board() {
    return this.belongsTo('App/Models/Board');
  }
}

module.exports = Entry
