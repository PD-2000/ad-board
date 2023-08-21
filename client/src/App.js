import {Container} from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import AdSingle from './components/features/AdSingle/AdSingle';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';
import AdRemove from './components/pages/AdRemove/AdRemove';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import {logIn} from './redux/usersRedux';
import {API_URL} from './config';

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user);

  useEffect(() => {
    fetch(`${API_URL}/auth/user`)
      .then(res => res.json())
      .then(res => {
        if(res.status === 200) {
          dispatch(logIn({login: res.login}));
        }
      })
  }, [dispatch]);

  return (
    <main>
      <Container>
        {/* <pre>{JSON.stringify(user)}</pre> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<AdSingle />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AdEdit />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;