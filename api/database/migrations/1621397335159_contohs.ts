import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contohs extends BaseSchema {
  protected tableName = 'contohs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('judul').notNullable()
      table.string('teks').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
