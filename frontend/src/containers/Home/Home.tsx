import {Box, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchNewsData} from '../../store/news/newsThunks';
import {selectNewsData} from '../../store/news/newsSlice';
import CardItemNews from '../../components/CardItemNews/CardItemNews';

const Home = () => {
  const dispatch = useAppDispatch();
  const newsData = useAppSelector(selectNewsData);

  useEffect(() => {
      dispatch(fetchNewsData());
  }, [dispatch]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h3">Посты</Typography>
        <Button to="/create-post" component={Link} variant="contained">Добавить новый пост</Button>
      </Box>

      <Typography variant="h5">{newsData.length === 0 ? 'Список новостей пуст, добавьте публикацию!' : null}</Typography>
      {newsData.map((data) => (
        <CardItemNews key={data.id} data={data}/>
      ))}
    </>
  );
};

export default Home;