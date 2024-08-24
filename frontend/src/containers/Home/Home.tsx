import {Box, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}>
      <Typography variant="h4">Посты</Typography>
      <Button to="/create-post" component={Link} variant="contained">
        Добавить новый пост
      </Button>
    </Box>
  );
};

export default Home;