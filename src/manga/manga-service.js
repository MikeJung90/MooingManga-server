const xss = require('xss');
const Treeize = require('treeize');

const MangaService = {
  getAllManga(db) {
    return db
      .from('mooingmanga_manga AS mga')
      .select(
        'mga.id',
        'mga.title',
        'mga.content',
        'mga.image',
        ...userFields,
      )
      .leftJoin(
        'mooingmanga_users AS usr',
        'mga.user_id',
        'mga.id',
      )
      .groupBy('mga.id', 'usr.id')
  },

  getById(db, id) {
    return MangaService.getAllManga(db)
      .where(mga.id, id)
      .first()
  },

  serializeManga(manga) {
    return manga.map(this.serializeManga)
  },

  serializeManga(manga) {
    const mangaTree = new Treeize()
    const mangaData = mangaTree.grow([ manga ]).getData()[0]

    return {
      id: mangaData.id,
      title: xss(mangaData.title),
      content: xss(mangaData.content),
      image: mangaData.image,
      user: mangaData.user || {},
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.first_name AS user:first_name',
  'usr.last_name AS user:last_name',
  '',
]

module.exports = MangaService