
import './App.css'
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router"
import Login from './components/Login';
import SignUp  from './components/SignUp';
import MyLibrary from './components/MyLibrary';
import MyInterestedSongs from './components/MyInterestedSongs';
import SearchPage from './components/SearchPage';
import CarouselSongCard from './components/CarouselSongCard';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid'


function App() {

  const [currentUser, setCurrentUser] = useState([])
  const [userSongs, setUserSongs] = useState([])
  const [interestedSongs, setInterestedSongs] = useState([])
  const [randomSongs, setRandomSongs] = useState([])
  const [fetchedSong, setFetchedSong] = useState([])
  const history = useHistory()


    useEffect(() => { 
        if (currentUser.id)
      fetch(`/Songsbeingplayed/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
          setRandomSongs(data)
     
     })
  },[currentUser])

  useEffect(() => {
    fetch(`/me`)
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setCurrentUser(data)
      } 
    })
    }, [])

    useEffect(() => {
      if (currentUser.id) {
        fetch(`/getsongs/${currentUser.id}`)
        .then(res => res.json())
        .then(data =>{
          if (data.length > 0){
            setUserSongs(data)
          }
        })
      } else {
        setUserSongs([])
      }
    }, [currentUser])

    useEffect(() => {
      if (currentUser.id) {
        fetch(`/getinterests/${currentUser.id}`)
        .then(res => res.json())
        .then(data =>{
          if (data.length > 0){
            setInterestedSongs(data)
          }
        })
      } else {
        setInterestedSongs([])
      }
    }, [currentUser])

    function handleMoreDetailsFetch(id) {
      fetch(`/songs/${id}`)
      .then(res => res.json())
      .then(data => {
        
        setFetchedSong(data)
   
        history.push('/cardpage')
      })

    }


  return (

    <div className="App">
      <Grid  container

  direction="row"
  justifyContent="flex-start"
  >
    <Grid item xs={2} style={{ backgroundImage:'url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/spanish-acoustic-guitar-dark-red-background-bigalbaloo-stock.jpg)', backgroundAttachment: 'fixed' }}>
      <NavBar currentUser={currentUser}/>
      </Grid>
      <Grid item xs={8} >
      <Switch>

        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser}/>
        </Route>

        <Route exact path="/signup">
          <SignUp setCurrentUser={setCurrentUser}/>
        </Route>

        <Route exact path="/mylibrary">
          <MyLibrary currentUser={currentUser} setUserSongs={setUserSongs} userSongs={userSongs} />
        </Route>

        <Route exact path="/myinterestedsongs">
          <MyInterestedSongs userSongs={userSongs} setUserSongs={setUserSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} interestedSongs={interestedSongs}/>
        </Route>

        <Route exact path="/searchpage">
          <SearchPage interestedSongs={interestedSongs} setUserSongs={setUserSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} userSongs={userSongs}/>
        </Route>

        <Route exact path="/cardpage">
        <CarouselSongCard setUserSongs={setUserSongs} userSongs={userSongs} song={fetchedSong} handleMoreDetailsFetch={handleMoreDetailsFetch} />
        </Route>

        <Route exact path="/">
          <Home handleMoreDetailsFetch={handleMoreDetailsFetch} currentUser={currentUser} setCurrentUser={setCurrentUser} randomSongs={randomSongs}/>
        </Route>

      </Switch>
      
      </Grid>
      <Grid item xs={2} style={{ backgroundImage:'url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/spanish-acoustic-guitar-dark-red-background-bigalbaloo-stock.jpg)', backgroundAttachment: 'fixed',}}></Grid>
      </Grid>
    </div>
    
  );
}

export default App;
