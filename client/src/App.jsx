import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  return <BrowserRouter>

  <Header />

  <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/howitworks' element={<HowItWorks />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/profile' element={<Profile />}></Route>
  </Routes>

  </BrowserRouter>
};

export default App;
