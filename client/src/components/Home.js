import Login from "./Login";
import Carousel from 'react-multi-carousel'
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import {useHistory} from "react-router-dom"
import 'react-multi-carousel/lib/styles.css';
import Grid from '@material-ui/core/Grid'

function Home({currentUser, handleMoreDetailsFetch, setCurrentUser, randomSongs}) {

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
    
      // const [randomSongs, setRandomSongs] = useState([])
      // const history = useHistory()
  
      //   useEffect(() => { 
      //       if (currentUser.id)
      //     fetch(`/Songsbeingplayed/${currentUser.id}`)
      //     .then(res => res.json())
      //     .then(data => {
      //         setRandomSongs(data)
      //         console.log(data)
      //    })
      // },[currentUser])


  
      const renderSongs = randomSongs.map(song => {
          return <CarouselCard handleMoreDetailsFetch={handleMoreDetailsFetch} key={song.id} song={song} />
      })
      
    return(
      <>


      <br/>

 
          <Grid container
direction="row"
justifyContent="flex-start">
      <Grid item xs={10}>
      {currentUser.id ? <h2>My Guitar Space</h2> : null}
    {currentUser.id ? 
    <>
    <h2>Welcome {currentUser.name} </h2>

        

    </>
     : <Login setCurrentUser={setCurrentUser} />}
    {randomSongs.length > 0 ? <> <h4>Whens the last time you played....</h4>
    
    <div  className="carousel-div"  >
            <Carousel infinite={true} responsive={responsive} style={{marginLeft: '15%'}} >
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