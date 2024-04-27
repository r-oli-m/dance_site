import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreateMate from './pages/CreateMate'
import EditPost from './pages/EditPost'
import MateDetail from './pages/MateDetail'
import Home from './pages/Home'

import { Link } from 'react-router-dom'


const App = () => {
  

  const mates = [
      {'id':'1', 
      'name': 'oliber',
      'speed': 5, 
      'color': 'pink'},
  ]
 

  // Sets up routes
  let element = useRoutes([
    { path: "/", 
    element: <Home/> }
    ,
    {
      path: "/gallery",
      element:<ReadPosts data={mates}/>
    },
    {
      path:"/gallery/edit/:id",
      element: <EditPost data={mates} />
    },
    {
      path:"/new",
      element: <CreateMate />
    },
    {
      path:"/gallery/detail/:id",
      element: <MateDetail />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>✨ Dance The Night Away ✨</h1>
        <Link to="/"><button className="headerBtn"> About </button></Link>
        <Link to="/gallery"><button className="headerBtn"> Home </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Post </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
