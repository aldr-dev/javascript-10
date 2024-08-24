import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import dayjs from 'dayjs';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import CommentsForm from '../../components/CommentsForm/CommentsForm';
import {fetchOneNewsData} from '../../store/news/newsThunks';
import {deleteOneComment, fetchCommentsData} from '../../store/comments/commentsThunks';
import {selectFullNewsData} from '../../store/news/newsSlice';
import {selectCommentsData, updateStateComment} from '../../store/comments/commentsSlice';
import OneComment from '../../components/OneComment/OneComment';
import {API_URL} from '../../config';

const FullNews = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const fullNews = useAppSelector(selectFullNewsData);
  const comments = useAppSelector(selectCommentsData);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNewsData(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsData(id));
    }
  }, [dispatch, id]);

  const formattedDate = dayjs(fullNews?.created_at).format('YYYY-MM-DD HH:mm:ss');

  let defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

  if (fullNews?.image) {
    defaultImage = API_URL + '/' + fullNews.image;
  }

  let commentsBox = (
    <Typography variant="h4" sx={{textAlign: 'center'}}>
      Список комментарием пуст, добавьте комментарий!
    </Typography>
  );

  const handleCommentDelete = async (id: string) => {
    const confirmDelete = confirm('Вы действительно хотите удалить данный комментарий?');
    if  (confirmDelete) {
      await dispatch(deleteOneComment(id));
      dispatch(updateStateComment(parseInt(id)));
    }
  };

  if (comments.length > 0) {
    commentsBox = (
      <Box sx={{width: '50%', mx: 'auto'}}>
        {comments.map((comment) => (
          <OneComment
            id={comment.id.toString()}
            key={comment.id}
            author={comment.author}
            content={comment.content}
            onDelete={() => handleCommentDelete(comment.id.toString())}
          />
        ))}
      </Box>
    );
  }

  const idNews = id || '';
  return (
    <>
      <Card sx={{mb: '15px', width: '50%', mx: 'auto', mt: '20px'}}>
        <CardMedia
          component="img"
          sx={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxWidth: '650px',
            mx: 'auto',
          }}
          image={defaultImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {fullNews?.title}
          </Typography>
          <Typography variant="h6" component="div">
            {formattedDate}
          </Typography>
          <Typography variant="h5" component="div">
            {fullNews?.content}
          </Typography>
        </CardContent>
      </Card>
      <CommentsForm idNews={idNews} id={id}/>
      {commentsBox}
    </>
  );
};

export default FullNews;