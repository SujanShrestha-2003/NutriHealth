import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import StartingPage from './pages/StartingPage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Questioneer from './pages/Questioneer.jsx';

const App = () => {
  return <BrowserRouter>

  <Routes>
    <Route path='/' element={<StartingPage />}></Route>
    <Route path='/landing' element={<LandingPage />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/profile' element={<Profile />}></Route>
    <Route path='/questioneer' element={<Questioneer />}></Route>
  </Routes>

  </BrowserRouter>
};

export default App;
