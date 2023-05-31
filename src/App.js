import './App.css';
import Header from '../src/components/header/Header';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import RegistrationForm from './components/user/RegisterForm';

function App() {
  let check = (localStorage.getItem("token") === "null");
  return (
    <div className="App">

<Router>
        <Header />
        <Routes>
          <Route path="/" element={check ? <Login/> : <Home />} />
          <Route exact path="/home" element={check ? <Login/> : <Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<RegistrationForm />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
