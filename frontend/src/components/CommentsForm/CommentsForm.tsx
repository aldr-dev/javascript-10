import React, {useState} from 'react';
import {CommentsMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {toast} from 'react-toastify';
import {Box, Grid, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import {postFormComments} from '../../store/comments/commentsThunks';
import {selectPostCommentsIsLoading} from '../../store/comments/commentsSlice';

const CommentsForm = () => {
  const [commentsData, setCommentsData] = useState<CommentsMutation>({
    newsId: '',
    author: '',
    content: '',
  });
  const dispatch = useAppDispatch();
  const commentIsLoading = useAppSelector(selectPostCommentsIsLoading);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCommentsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (commentsData.content.trim().length !== 0 && commentsData.newsId.length > 0) {
        await dispatch(postFormComments(commentsData)).unwrap();
        setCommentsData({
          newsId: '',
          author: '',
          content: '',
        });
      }
    } catch (error) {
      console.error(error + 'Произошла ошибка при отправке запроса, попробуйте позже.');
      toast.error('Произошла ошибка при отправке запроса, попробуйте позже.');
    }
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitForm}>
        <Typography variant={'h4'} sx={{mb: 2}}>Оставить комментарий</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={onFieldChange}
              label="Имя"
              id="author"
              name="author"
              value={commentsData.author}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onFieldChange}
              label="Комментарий"
              id="content"
              name="content"
              value={commentsData.content}
              required
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{mt: 2}}
          color="primary"
          type="submit"
          loading={commentIsLoading}
          loadingPosition="start"
          startIcon={<SendIcon/>}
          variant="contained">
          <span>Отправить</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default CommentsForm;