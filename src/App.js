import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Search from './components/search';
import Tweet from './components/tweet';
import About from './components/about';

function App()
{
  return(
    <BrowserRouter>    
      <Routes>
        <Route exact path='/' element = {<Login/>}/>
        <Route exact path="/home" element = {<Home/>}/>
        <Route exact path="/register" element = {<Register/>}/>
        <Route exact path="/search" element = {<Search/>}/>
        <Route exact path="/tweet" element = {<Tweet/>}/>
        <Route exact path="/about" element = {<About/>}/>
      </Routes>   
    </BrowserRouter>
  );
}

export default App;