const express = require('express');
const MangaService = require('./manga-service');
const { requireAuth } = require('../middleware/jwt-auth');

const MangaRouter = express.Router()

MangaRouter
  .route('/')
  .get((req, res, next) => {
    MangaService.getAllManga(req.app.get('db'))
      .then(manga => {
        res.json(MangaService.serializeManga(manga))
      })
      .catch(next)
  })

MangaRouter
  .route('/:manga_id')
  .all(requireAuth)
  .all(checkMangaExists)
  .get((req, res) => {
    res.json(MangaService.serializeThing(res.manga))
  })

async function checkMangaExists(req, res, next) {
  try {
    const manga = await MangasService.getById(
      req.app.get('db'),
      req.params.manga_id
    )

    if (!manga)
      return res.status(404).json({
        error: `Manga doesn't exist`
      })

    res.manga = manga
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = MangaRouter