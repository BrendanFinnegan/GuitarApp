import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router"
import Login from './components/Login';
import SignUp  from './components/SignUp';
import MyLibrary from './components/MyLibrary';
import MyInterestedSongs from './components/MyInterestedSongs';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  const [currentUser, setCurrentUser] = useState([])
  const [userSongs, setUserSongs] = useState([])
  const [interestedSongs, setInterestedSongs] = useState([])


console.log(currentUser)

  return (
    // <Router>
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/mylibrary">
          <MyLibrary />
        </Route>
        <Route exact path="/myinterestedsongs">
          <MyInterestedSongs />
        </Route>
        <Route exact path="/">
          <Home currentUser={currentUser}/>
        </Route>
      </Switch>
    </div>
    // </Router>
  );
}

export default App;
