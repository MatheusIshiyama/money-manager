import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'title' })
  public title: string

  @column({ columnName: 'description' })
  public description: string

  @column({ columnName: 'value' })
  public value: number

  @column({ columnName: 'is_coming' })
  public isComing: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
