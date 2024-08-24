import express from 'express';
import mysqlDb from '../mysqlDb';
import {News, NewsWithoutId} from '../types';
import {imagesUpload} from '../multer';
import {ResultSetHeader} from 'mysql2';

const newsRouter = express.Router();

newsRouter.get('/', async (_, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query(
      'SELECT id, title, image, created_at FROM news',
    );

    const news = result[0] as News[];

    if (news.length === 0) {
      res.status(404).send({'Ошибка': 'Список новостей пуст!'});
    }
    return res.send(news);
  } catch (error) {
    next(error);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    const news = result[0] as News[];

    if (news.length === 0) {
      return res.status(404).send({'Ошибка': 'Новость не найдена!'});
    }
    return res.send(news[0]);
  } catch (error) {
    next(error);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({'Ошибка': 'Название и описание новости должно присутствовать!'});
    }

    const news: NewsWithoutId = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
    };

    const insertResult = await mysqlDb.getConnection().query(
      'INSERT INTO news (title, content, image) VALUES (?, ?, ?)',
      [news.title, news.content, news.image],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM news WHERE id = ?',
      [resultHeader.insertId],
    );

    const newsResult = getNewResult[0] as News[];
    return res.send(newsResult[0]);
  } catch (error) {
    next(error);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query<ResultSetHeader>(
      'DELETE FROM news WHERE id = ?',
      [id],
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).send({'Ошибка': 'Не удалось удалить новость, так-как id не найден!'});
    }

    return res.send('Новость удалена.');
  } catch (error) {
    next(error);
  }
});

export default newsRouter;