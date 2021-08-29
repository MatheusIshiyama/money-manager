import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index() {
    return Note.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'value', 'isComing'])

    const transaction = await Database.transaction()

    try {
      const note = new Note()
      note.useTransaction(transaction)

      note.merge(data)

      await note.save()

      await transaction.commit()

      return note
    } catch (error) {
      await transaction.rollback()
    }
  }

  public async show({ params }: HttpContextContract) {
    return Note.findOrFail(params.id)
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['title', 'description', 'value', 'isComing'])

    const note = await Note.findOrFail(params.id)

    const transaction = await Database.transaction()

    try {
      note.useTransaction(transaction)

      note.merge(data)

      await note.save()

      await transaction.commit()

      return note
    } catch (error) {
      await transaction.rollback()
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const note = await Note.findOrFail(params.id)

    await note.delete()
  }
}
