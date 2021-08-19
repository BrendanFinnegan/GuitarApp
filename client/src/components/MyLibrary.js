import Grid from '@material-ui/core/Grid'
import SongCard from './SongCard'
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react"
import TextField from '@material-ui/core/TextField';

function MyLibrary({userSongs, setUserSongs}){
    let history = useHistory()
    const [filterInput, setFilterInput] = useState("")
    const useStyles = makeStyles((theme) => ({
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
          
        },
      }));
      const classes = useStyles();

      
      function handleSearch(e) {
        setFilterInput(e.target.value)
    }
    
    let filterCards = userSongs.filter(song => song.title.toLowerCase().includes(filterInput.toLowerCase()) || song.artist.toLowerCase().includes(filterInput.toLocaleLowerCase()))
    
       
    let songCards = filterCards.map(song => {
        return <Grid item key={song.id}>
            <Accordion style={{ boxShadow: "none" }}  >
        <AccordionSummary  >
        <Typography className={classes.heading} >  {song.artist}, {song.title} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
          <SongCard setUserSongs={setUserSongs} userSongs={userSongs} song={song} />
            </>
            </AccordionDetails>
            </Accordion>
       

            

                </Grid>
    })
    
function handleNewSongFormNavigation() {
    history.push('/newsongform')
}


    return(
    <>
    <Grid container
  direction="row"
  justifyContent="flex-start"
  alignItems="center">
      <Grid item xs={12}>
    <h2>MyLibrary</h2>
      </Grid>
    <Grid item xs={3}>
    <TextField variant="filled" style={{backgroundColor: 'white', borderRadius: '5px'}} label="Search by Artist or Title" value={filterInput} onChange={handleSearch} />
    </Grid>
    <Grid item xs={6}></Grid>
    <Grid item xs={3}>
    <Button className="gameButton" onClick={handleNewSongFormNavigation}>Add New Song To Library</Button>
    </Grid>
    </Grid>
    <Grid container
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-end">
    {songCards}
    </Grid>
    </>
    )
}
export default MyLibrary