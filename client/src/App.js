import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router"
import Login from './components/Login';
import SignUp  from './components/SignUp';
import MyLibrary from './components/MyLibrary';
import MyInterestedSongs from './components/MyInterestedSongs';
import SongCard from './components/SongCard';
import NewSongForm from './components/NewSongForm';
import NewInterestedSongForm from './components/NewInterestedSongForm';
import SearchPage from './components/SearchPage';
import CarouselSongCard from './components/CarouselSongCard';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
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
          console.log(data)
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
        console.log(data)
        history.push('/cardpage')
      })

    }
    console.log(fetchedSong)

  return (

    <div className="App">
      <Grid  container

  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
    <Grid item xs={2} style={{paddingRight: '40px'}}>
      <NavBar currentUser={currentUser}/>
      </Grid>
      <Grid item xs={10}>
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
        {/* <Route exact path="/newsongform">
          <NewSongForm userSongs={userSongs} setUserSongs={setUserSongs} currentUser={currentUser}/>
        </Route> */}
        {/* <Route exact path="/newinterestedsongform">
          <NewInterestedSongForm interestedSongs={interestedSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser}/>
        </Route> */}
        <Route exact path="/searchpage">
          <SearchPage interestedSongs={interestedSongs} setUserSongs={setUserSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} userSongs={userSongs}/>
        </Route>
        <Route exact path="/cardpage">
        <CarouselSongCard setUserSongs={setUserSongs} userSongs={userSongs} song={fetchedSong} />
        </Route>
        <Route exact path="/">
          <Home handleMoreDetailsFetch={handleMoreDetailsFetch} currentUser={currentUser} setCurrentUser={setCurrentUser} randomSongs={randomSongs}/>
        </Route>
      </Switch>
      </Grid>
      </Grid>
    </div>
    
  );
}

export default App;
