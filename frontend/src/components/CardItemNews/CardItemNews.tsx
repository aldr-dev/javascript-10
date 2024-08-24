import React from 'react';
import {Box, CardMedia, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {News} from '../../types';
import {API_URL} from '../../config';
import {Link} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteIsLoading, updateStateNews} from '../../store/news/newsSlice';
import {deleteOneNews} from '../../store/news/newsThunks';

interface Props {
  data: News;
}

const CardItemNews: React.FC<Props> = ({data}) => {
  const image = data.image ? `${API_URL}/${data.image}` : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  const deleteOneNewsLoading = useAppSelector(selectDeleteIsLoading);
  const dispatch = useAppDispatch();

  const handleDeleteOneNews = async (newsId: string) => {
    await dispatch(deleteOneNews(newsId));
    dispatch(updateStateNews(parseInt(newsId)));
  };

  return (
    <Grid container alignItems="center" sx={{padding: '10px', borderRadius: '4px', mb: 1, border: '1px solid #000'}}>
      <Grid item xs={1.1} sx={{display: 'flex', alignItems: 'center', width: '50px', marginRight: '10px'}}>
        <CardMedia
          component="img"
          height="100"
          width="200px"
          image={image}
          alt={data.title}
          sx={{borderRadius: '5px', objectFit: 'cover'}}
        />
      </Grid>
      <Grid item xs>
        <Box>
          <Typography variant="body1">
            <b>{data.title}</b>
          </Typography>
          <Typography variant="body1" sx={{marginTop: '8px', color: '#BDB2B1'}}>
            {dayjs(data.created_at).format('DD.MM.YY HH:mm')}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <Link to={`/news/${data.id}`}
              style={{marginRight: '20px', textDecoration: 'underline', color: '#1976D2', marginTop: '15px'}}>Читать
          полностью...</Link>
        <LoadingButton
          onClick={() => handleDeleteOneNews(data.id.toString())}
          sx={{mt: 2}}
          color="primary"
          type="submit"
          loading={deleteOneNewsLoading ? deleteOneNewsLoading === data.id.toString() : false}
          loadingPosition="start"
          startIcon={<DeleteIcon/>}
          variant="contained">
          <span>Удалить</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CardItemNews;