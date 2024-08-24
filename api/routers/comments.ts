import express from 'express';
import mysqlDb from '../mysqlDb';
import {Comments, CommentsWithoutId} from '../types';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    let sql = 'SELECT * FROM comments';
    const {newsId} = req.query;

    if (newsId) {
      sql = 'SELECT * FROM comments WHERE news_id = ?';
    }

    const [comments] = await mysqlDb.getConnection().query(sql, [newsId]);

    return res.send(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.content || !req.body.newsId) {
      return res.status(400).send({'Ошибка': 'Описание и ID у комментария должно присутствовать!'});
    }

    const comment: CommentsWithoutId = {
      news_id: parseInt(req.body.newsId),
      author: req.body.author || 'Анонимный',
      content: req.body.content,
    };

    const newsRequiredID = await mysqlDb.getConnection().query(
      'SELECT id FROM news WHERE id = ?',
      [comment.news_id],
    ) as RowDataPacket[];

    if (newsRequiredID.length === 0) {
      return res.status(400).send({'Ошибка': 'Не удалось найти новость!'});
    }

    const insertResult = await mysqlDb.getConnection().query(
      'INSERT INTO comments (news_id, author, content) VALUES (?, ?, ?)',
      [comment.news_id, comment.author, comment.content],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM comments WHERE id = ?',
      [resultHeader.insertId],
    );

    const commentResult = getNewResult[0] as Comments[];
    return res.send(commentResult[0]);
  } catch (error) {
    next(error);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query<ResultSetHeader>(
      'DELETE FROM comments WHERE id = ?',
      [id],
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).send({'Ошибка': 'Не удалось удалить комментарий, так-как id не найден!'});
    }

    return res.send('Комментарий удален.');
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;