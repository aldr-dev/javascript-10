import {Link} from 'react-router-dom';
import {Container, Typography, Box, Button} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      py={{xs: 3, md: 5}}>
      <Container>
        <Box textAlign="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mb={4}>
            <Typography variant="h1" fontWeight="bold">
              4
            </Typography>
            <ErrorIcon color="error" sx={{fontSize: '50px'}}/>
            <Typography variant="h1" fontWeight="bold" sx={{transform: 'scaleX(-1)'}}>
              4
            </Typography>
          </Box>
          <Typography variant="h4" mb={2}>
            Упс! Вы потерялись.
          </Typography>
          <Typography variant="body1" mb={5}>
            Страница, которую вы ищете, не найдена.
          </Typography>
          <Button
            to="/"
            component={Link}
            variant="contained"
            size="large"
            sx={{borderRadius: '50px', px: 5, color: '#fff'}}>Вернуться на главную
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PageNotFound;