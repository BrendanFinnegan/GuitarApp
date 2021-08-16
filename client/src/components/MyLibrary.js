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



function MyLibrary({userSongs, setUserSongs}){
    let history = useHistory()

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
    let songCards = userSongs.map(song => {
        return <Grid item key={song.id}>
            <Accordion style={{ boxShadow: "none" }}  >
        <AccordionSummary  >
        <Typography className={classes.heading} > {song.title}, {song.artist} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
          <SongCard setUserSongs={setUserSongs} song={song} />
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
    <h2>MyLibrary</h2>
    <Button className="gameButton" onClick={handleNewSongFormNavigation}>Add New Song To Library</Button>
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