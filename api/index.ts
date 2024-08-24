import express from 'express';
import cors from 'cors';
import config from './config';
import mysqlDb from './mysqlDb';
import newsRouter from './routers/news';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
};

run().catch(console.error);