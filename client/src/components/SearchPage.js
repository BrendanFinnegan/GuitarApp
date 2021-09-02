import SearchedSongCard from './SearchedSongCard'
import Grid from '@material-ui/core/Grid'
import { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap"
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';

function SearchPage({interestedSongs, setUserSongs,setInterestedSongs, currentUser, userSongs}) {

    const [titleSearchTerm, setTitleSearchTerm] = useState('')
    const [artistSearchTerm, setArtistSearchTerm] = useState('')
    const [resultsArray, setResultsArray] = useState([])
    const [errors, setErrors] = useState('')

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
          transition: 'none'
        },
        heading: {
          color: 'black',
          fontFamily: 'Reem Kufi',  
          fontWeight: 'bold', 
          border: 'none', 
          shadow: 'none',
          textDecoration: 'none'
        },
      }));
      
    const classes = useStyles();

    let resultCards = resultsArray.map(song => {

        return   <Grid item key={song.track.track_id}>
                <Accordion style={{ boxShadow: "none" , paddingLeft: "20px" }}  >
        <AccordionSummary className={classes.root} >
        <Typography className={classes.heading} > {song.track.track_name}, {song.track.artist_name} </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <>

        
        <SearchedSongCard key={song.track.album_id} song={song} interestedSongs={interestedSongs} currentUser={currentUser} setInterestedSongs={setInterestedSongs} userSongs={userSongs} setUserSongs={setUserSongs}/>
        </>
            </AccordionDetails>
            </Accordion>
                </Grid>

    })

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`/search?artist=${artistSearchTerm}&title=${titleSearchTerm}`)
        .then(res => res.json())
        .then(data => {
           if (data.message.body.track_list.length > 0)
           { setResultsArray(data.message.body.track_list)
            setErrors('')}
            else {
                setResultsArray([])
                setErrors("No Results")}
        })
    }

    return(
        <>
        <Grid container
          justifyContent="flex-center"
          alignItems="center"
          >

   <Grid item xs={12}>
        <h2>Search by Title, Artist, or Both</h2>
        <form onSubmit={handleSubmit}>
        <TextField  className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Title" value={titleSearchTerm} onChange={e => setTitleSearchTerm(e.target.value)} />
        <br/>
        <TextField  className={classes.roots} style={{backgroundColor: 'white', borderRadius: '5px'}} label="Artist" value={artistSearchTerm} onChange={e => setArtistSearchTerm(e.target.value)} />
        <br/>
        <br/>
        <Button type="submit" className="gameButton">Search</Button>
        
        </form>
  </Grid>

    <Grid container
          justifyContent="flex-center"
          alignItems="center">
       {resultCards}
    </Grid>
    {errors ? <h3 style={{fontFamily: 'Reem Kufi', color: 'black' }}>{errors}</h3> : null} 
    </Grid>
        </>
    )
}

export default SearchPage