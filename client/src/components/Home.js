import Login from "./Login";
import Carousel from 'react-multi-carousel'
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import {useHistory} from "react-router-dom"
import 'react-multi-carousel/lib/styles.css';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

function Home({currentUser, handleMoreDetailsFetch, setCurrentUser, randomSongs}) {
  const useStyles = makeStyles((theme) => ({
    roots: {
      '& label.Mui-focused': {
        color: '#8d0000',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8d0000',
      },
      '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `3px solid #8d0000`
    },
    },  
    root: {
        width: '100%',
        border: 'none', 
        shadow: 'none', 
        transition: 'none',
        padding: '0px',
        marginBottom: '0px'
      },
      heading: {
        color: 'black',
        fontFamily: 'Reem Kufi',  
        fontWeight: 'bold', 
        border: 'none', 
        shadow: 'none',
        fontSize: 'large'
     
      },
    }));
    const classes = useStyles();
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
      //       
      //    })
      // },[currentUser])


  
      const renderSongs = randomSongs.map(song => {
          return <CarouselCard handleMoreDetailsFetch={handleMoreDetailsFetch} key={song.id} song={song} />
      })
      
    return(
      <>




 
          <Grid container
direction="row"
justifyContent="flex-start">
      <Grid item xs={12}>
      {currentUser.id ? <h2>My Guitar Space</h2> : null}
    {currentUser.id ? 
    <>
    <br/>
    <h3>Welcome {currentUser.name} </h3>

        

    </>
     : <Login setCurrentUser={setCurrentUser} />}
    {randomSongs.length > 0 ? <> <h4>When's the last time you played...</h4>
    
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