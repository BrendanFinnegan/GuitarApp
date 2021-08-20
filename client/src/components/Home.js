import Login from "./Login";
import Carousel from 'react-multi-carousel'
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import {useHistory} from "react-router-dom"
import 'react-multi-carousel/lib/styles.css';
import Grid from '@material-ui/core/Grid'

function Home({currentUser, setCurrentUser}) {

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    
      const [randomSongs, setRandomSongs] = useState([])
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


  
      const renderSongs = randomSongs.map(song => {
          return <CarouselCard key={song.id} song={song} />
      })
      
console.log(renderSongs)
    return(
      <>

      <br/>
      <br/>

 
          <Grid container
direction="row"
justifyContent="flex-start">
    <Grid item xs={10}>
      <h3  style={{margin: 'auto', align: 'center', fontFamily: 'Reem Kufi', color: 'black' }}> Login </h3>
      <br/>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={10}>
    <h2>Home Page</h2>
    {currentUser.id ? 
    <>
    <p>Welcome {currentUser.name} </p>

        

    </>
     : <Login setCurrentUser={setCurrentUser} />}
    {currentUser.id?  <> <h4>Whens the last time you played....</h4>
    
    <div  className="carousel-div"  >
            <Carousel  centerMode="true" responsive={responsive} >
        {renderSongs} 
   
          </Carousel>
          </div>
          </>
          : null}

          </Grid>
          </Grid>
        </>
    )
}

export default Home;