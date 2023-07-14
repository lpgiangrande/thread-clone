import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav'
import Header from './components/Header'
import Feed from './components/Feed'
import PopUp from './components/PopUp'


const App = () => {

  const [ user, setUser ] = useState(null);
  const userId = "b23827d6-2601-4e15-8c98-52551f0009e3";

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json()
      setUser(data[0])

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() =>{
    getUser()
  }, [])

  console.log(user)
  
  
  return (
    <>
      {user && <div className="app">
        <Nav url={user.instagram_url}/> 
        <Header/>
        <Feed/>
        {/* <PopUp/> */}
      </div>}
    </>
  )
}

export default App
