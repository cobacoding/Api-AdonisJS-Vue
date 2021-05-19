// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contoh from 'App/Models/Contoh'

export default class ContohsController {
  public async index({ response }) {
    // fetch teks from db
    try {
      const teks = await Contoh.query().paginate(1, 10)
      // return a json response
      return response.status(200).json({
        messages: ['Success'],
        data: teks
      })
    } catch (error) {
      return response.status(500).json({
        messages: ['Network Error'],
        data: {}
      })
    }
  }

  public async fetchTeks({ params, response }) {
    // check if teks exists in db
    try {
      const dbTeks = await Contoh.findOrFail(params.id)
      response.status(200).json({messages: ['Ok'], data: dbTeks})
    } catch (error) {
      response.status(404).json({messages: ['Teks does not exist']})
    }
  }

  public async create({ request, response }) {
    // grab our request
    const teksData = request.post()
    // create a teks
    try {
      const newTeks = await Contoh.create({ judul: teksData.judul, teks: teksData.teks})
      // return response
      response.status(201).json({
        messages: ['Success Created'],
        data: newTeks
      })
    } catch (error) {
      response.status(422)
    }
  }

  public async updateProgress({ request, response, params }) {
    // check if teks exists
    try {
      const dbTeks = await Contoh.findOrFail(params.id)
      // grab our request
      const teksData = request.post()
      // update a teks
      dbTeks.completed = JSON.parse(teksData.status)
      await dbTeks.save()
      // return response
      response.status(201).json({
        messages: ['Success Updated'],
        data: dbTeks
      })
    } catch (error) {
      response.status(422)
    }
  }

  public async deleteTeks({ params, response }) {
    // check if teks exists in db
    try {
      const dbTeks = await Contoh.findOrFail(params.id)
      await dbTeks.delete()
      response.status(200)
    } catch (error) {
      response.status(404).json({messages: ['Teks does not exist']})
    }
  }

}
