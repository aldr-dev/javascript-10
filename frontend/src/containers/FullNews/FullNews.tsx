import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import dayjs from 'dayjs';
import {Box, CardContent, CardMedia, CircularProgress, Typography} from '@mui/material';
import CommentsForm from '../../components/CommentsForm/CommentsForm';
import {fetchOneNewsData} from '../../store/news/newsThunks';
import {deleteOneComment, fetchCommentsData} from '../../store/comments/commentsThunks';
import {selectFullNewsData} from '../../store/news/newsSlice';
import {selectCommentsData, selectGetCommentsIsLoading, updateStateComment} from '../../store/comments/commentsSlice';
import OneComment from '../../components/OneComment/OneComment';
import {API_URL} from '../../config';

const FullNews = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const fullNews = useAppSelector(selectFullNewsData);
  const comments = useAppSelector(selectCommentsData);
  const commentsIsLoading = useAppSelector(selectGetCommentsIsLoading);

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

  let commentsBox;

  if (commentsIsLoading) {
    commentsBox = (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </Box>
    );
  } else if (comments.length > 0) {
    commentsBox = (
      <Box>
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
  } else {
    commentsBox = (
      <Typography variant="h5" sx={{textAlign: 'center', mt: 2, mb: 2}}>
        Список комментариев пуст, добавьте комментарий!
      </Typography>
    );
  }

  const handleCommentDelete = async (id: string) => {
    const confirmDelete = confirm('Вы действительно хотите удалить данный комментарий?');
    if  (confirmDelete) {
      await dispatch(deleteOneComment(id));
      dispatch(updateStateComment(parseInt(id)));
    }
  };

  const idNews = id || '';
  return (
    <>
      <Box sx={{mb: '15px', width: '50%', mt: '20px'}}>
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
        <CardContent sx={{paddingLeft: 0}}>
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
      </Box>
      <hr/>
      <Typography variant="h4">Коментарии:</Typography>
      {commentsBox}
      <CommentsForm idNews={idNews} id={id}/>
    </>
  );
};

export default FullNews;