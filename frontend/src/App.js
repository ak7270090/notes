import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CreateNote from './screens/CreateNode/CreateNode';
import LandingPage from './screens/Landngpage/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import MyNotes from './screens/MyNotes/MyNotes';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import SingleNote from './screens/SingleNote';

const App=() => {
  
  const [search, setSearch] = useState("");

  return(
    <Router>
      <Header setSearch={setSearch} />
      <main  >
        <Routes>
        <Route path='/' element={<LandingPage />} exact ></Route>
        <Route path='/login' element={<LoginScreen />} exact ></Route>
        <Route path='/register' element={<RegisterScreen />} exact ></Route>
        <Route path='/createnote' element={<CreateNote />} exact ></Route>
        <Route path='/note/:id' element={<SingleNote />}  ></Route>
        <Route path="/profile" element={< ProfileScreen />} />
        <Route path='/mynotes' element={< MyNotes search={search}  />} />
        </Routes>
      </main>
      <Footer />
      </Router>
  )
//  <div>
//     <Header />
//     <LandingPage />
//     <Footer />
//     </div> 
  };

export default App;
