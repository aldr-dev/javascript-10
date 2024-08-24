import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchNewsData } from '../../store/news/newsThunks';
import { selectGetIsLoading, selectNewsData } from '../../store/news/newsSlice';
import CardItemNews from '../../components/CardItemNews/CardItemNews';

const Home = () => {
  const dispatch = useAppDispatch();
  const newsData = useAppSelector(selectNewsData);
  const newsIsLoading = useAppSelector(selectGetIsLoading);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h3">Посты</Typography>
        <Button to="/create-post" component={Link} variant="contained">Добавить новый пост</Button>
      </Box>

      {newsIsLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {newsData.length === 0 ? (
            <Typography sx={{ mb: 1 }} variant="body1">Список публикаций пуст. Отправьте что-то...</Typography>
          ) : (
            newsData.map((data) => (
              <CardItemNews key={data.id} data={data} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default Home;
