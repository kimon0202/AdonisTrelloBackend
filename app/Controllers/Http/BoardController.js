'use strict'

const Board = use('App/Models/Board');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class BoardController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const boards = await Board.query().with('user').with('entries').fetch();

    return boards;
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['title', 'body']);
    const board = await Board.create({user_id: auth.user.id, ...data});

    return board;
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const board = await Board.findOrFail(params.id);

    return board;
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const board = await Board.findOrFail(params.id);

    if (board.user_id != auth.user.id){
      return response.status(401);
    }

    await board.delete();
  }
}

module.exports = BoardController
