'use strict'

const Entry = use('App/Models/Entry');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with entries
 */
class EntryController {
  /**
   * Show a list of all entries.
   * GET entries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const entries = await Entry.query().with('user').with('board').fetch();
  
    return entries;
  }

  /**
   * Create/save a new entry.
   * POST entries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['body', 'board_id']);
    const entry = await Entry.create({
      user_id: auth.user.id,
      ...data
    });

    return entry;
  }

  /**
   * Display a single entry.
   * GET entries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const entry = await Entry.findOrFail(params.id);

    return entry;
  }

  /**
   * Update entry details.
   * PUT or PATCH entries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

  }

  /**
   * Delete a entry with id.
   * DELETE entries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const entry = await Entry.findOrFail(params.id);

    if(entry.user_id != auth.user.id) {
      return response.status(401);
    }

    await entry.delete();
  }
}

module.exports = EntryController
