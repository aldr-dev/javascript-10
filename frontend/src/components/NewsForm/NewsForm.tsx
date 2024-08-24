import React, {useState} from 'react';
import {NewsMutation} from '../../types';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postFormNews} from '../../store/news/newsThunks';
import {useNavigate} from 'react-router-dom';
import {Box, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import {selectPostIsLoading} from '../../store/news/newsSlice';
import SendIcon from '@mui/icons-material/Send';

const NewsForm = () => {
  const [newsData, setNewsData] = useState<NewsMutation>({
    title: '',
    content: '',
    image: null,
  });
  const [resetFileName, setResetFileName] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postIsLoading = useAppSelector(selectPostIsLoading);

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setNewsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (newsData.title.trim().length !== 0 && newsData.content.trim().length !== 0) {
        await dispatch(postFormNews(newsData)).unwrap();
        setNewsData({
          title: '',
          content: '',
          image: null,
        });
        navigate('/');

        setResetFileName(true);
        toast.success('Новость была успешно добавлена.');
      }
    } catch (error) {
      console.error(error + 'Произошла ошибка при отправке запроса, попробуйте позже.');
      toast.error('Произошла ошибка при отправке запроса, попробуйте позже.');
    }
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitForm}>
        <Typography variant={'h4'} sx={{mb: 2}}>Опубликовать новый пост</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={onFieldChange}
              label="Заголовок"
              id="title"
              name="title"
              required
              value={newsData.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onFieldChange}
              label="Контент"
              id="content"
              name="content"
              value={newsData.content}
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item>
            <FileInput
              onChange={onChangeFileInput}
              label="Изображение"
              name="image"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{mt: 2}}
          color="primary"
          type="submit"
          loading={postIsLoading}
          loadingPosition="start"
          startIcon={<SendIcon />}
          variant="contained">
          <span>Отправить</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default NewsForm;