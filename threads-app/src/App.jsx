import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav'
import Header from './components/Header'
import Feed from './components/Feed'
import PopUp from './components/PopUp'
import WriteIcon from './components/WriteIcon'


const App = () => {

  const [ user, setUser ] = useState(null)
  const [ threads, setThreads ] = useState(null)
  const [ viewThreadsFeed, setViewThreadsFeed ] = useState(true)
  const [ filteredThreads, setFilteredThreads ] = useState(null)
  const [ openPopUp, setOpenPopUp ] = useState(false) 
  const [ interactiveThread, setInteractiveThread ] = useState(null)
  const [ popUpFeedThreads, setPopUpFeedThreads ] = useState(null)
  const [ text, setText ] = useState("")

  //const userId = "b23827d6-2601-4e15-8c98-52551f0009e3";
  const userId = "0e704255-a132-4dd5-b39d-9552debce019";
  //const userId = "26e782ed-3767-4bdc-9fc6-0d52c946f67e";

  /*--- user ---*/

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json()
      setUser(data[0])

    } catch (err) {
      console.error(err)
    }
  }


  /*--- threads ---*/

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`);
      const data = await response.json()
      setThreads(data)

    } catch (err) {
      console.error(err)
    }
  }

  const getThreadsFeed = () => {
    // click on "threads" section  : threads that are not replies (stand-alone)
    if(viewThreadsFeed){
      const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
      setFilteredThreads(standAloneThreads) 
    }

    // click on "replies" section : replies to others' threads
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads) 
    }
  }


  /*--- show replies to a thread ---*/

  const getReplies = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads/?reply_to=${interactiveThread?.id}`)
      const data = await response.json()
      setPopUpFeedThreads(data)
    } catch (err) {
      console.error(err)
    }
  }


  /*--- post a thread ---*/

  const postThread = async() => {

    const thread = {
      //"id": 0,
      "timestamp": new Date(),
      "thread_from": user.user_uuid,
      "thread_to": user.user_uuid || null,
      "reply_to": interactiveThread ? interactiveThread.id : null,
      // "reply_to": interactiveThread?id || null, 
      "text": text,
      "likes": []
    }

    try {
      const response = await fetch('http://localhost:3000/threads/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(thread)
     })
     const result = await response.json()
     console.log("RESULT : ", result)
     getThreads()
     getReplies()
     setText('')
    } catch (err) {
      console.error(err)
    }
  }
 
  // user & threads
  useEffect(() =>{
    getUser()
    getThreads()
  }, [])

  // each time the threads view changes (toggle between 'threads' & 'replies' sections)
  useEffect(() =>{
    getThreadsFeed()
  }, [user, threads, viewThreadsFeed])

  //console.log("interactiveThread : ", interactiveThread)
  //console.log("pop up threads : ", popUpFeedThreads)

  useEffect(() => {
    getReplies()
  }, [interactiveThread])

  const handleClick = () => {
    setPopUpFeedThreads(null)
    setInteractiveThread(null)
    setOpenPopUp(true)

  }
  /*-------------------*/ 
  //console.log("USER", user)
  //console.log("THREADS", threads)
  //console.log("VIEWTHREADFEED", viewThreadsFeed)
  // console.log("FILTEREDTHREADS", filteredThreads)
  /*-------------------*/ 
  /*
  When the state variables managed by useState are updated, 
  React will re-render the component, and any changes caused by useEffect 
  will be reflected in the updated render output.
  */


  return (
    <>
      {user && <div className="app">
        <Nav url={user.instagram_url}/> 
        <Header
          user={user}
          viewThreadsFeed={viewThreadsFeed}
          setViewThreadsFeed={setViewThreadsFeed}
        />
        <Feed
          user={user}
          setOpenPopUp={setOpenPopUp}
          filteredThreads={filteredThreads}
          getThreads={getThreads}
          setInteractiveThread={setInteractiveThread}
        />
       {
        openPopUp && 
          <PopUp
            user={user}
            setOpenPopUp={setOpenPopUp}
            popUpFeedThreads={popUpFeedThreads}
            text={text}
            setText={setText}
            postThread={postThread}
          />
        }
        <div onClick={handleClick}>
          <WriteIcon/>
        </div>
      </div>}
    </>
  )
}

export default App






  // // user & their threads

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userResponse = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
  //       const userData = await userResponse.json();
  //       setUser(userData[0]);
  //       //console.log("User data:", userData[0]);

  //       const threadsResponse = await fetch(`http://localhost:3000/threads?thread_from=${userId}`);
  //       const threadsData = await threadsResponse.json();
  //       setThreads(threadsData);
  //       //console.log("Threads data:", threadsData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
    
  //   fetchData();
  // }, []);


  // // feed : threads & replies sections

  // useEffect(() => {
  //   // console.log("View Threads Feed:", viewThreadsFeed);
  //   // console.log("Threads:", threads);

  //   // click on "threads" section  : threads that are not replies (stand-alone)
  //   if (viewThreadsFeed) {
  //     const standAloneThreads = threads?.filter(thread => thread.reply_to === null);
  //     setFilteredThreads(standAloneThreads);
  //   // click on "replies" section : replies to others' threads
  //   } else {
  //     const replyThreads = threads?.filter(thread => thread.reply_to !== null);
  //     setFilteredThreads(replyThreads);
  //   }
  // }, [threads, viewThreadsFeed]);

  // if (!user) {
  //   return null; // or a loading spinner, error message, etc.
  // }