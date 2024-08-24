import Home from './containers/Home/Home';
import {Route, Routes} from 'react-router-dom';
import NewsForm from './components/NewsForm/NewsForm';
import PageNotFound from './components/PageNotFound/PageNotFound';
import FullNews from './containers/FullNews/FullNews';
import {Container} from '@mui/material';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg" sx={{mb: 3}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/news/:id" element={<FullNews/>}/>
          <Route path="/create-post" element={<NewsForm/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;