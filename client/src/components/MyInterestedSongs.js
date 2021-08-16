import Grid from '@material-ui/core/Grid'
import InterestedSongCard from './InterestedSongCard'
import Box from '@material-ui/core/Box';
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';


function MyInterestedSongs({interestedSongs, currentUser, setInterestedSongs, userSongs, setUserSongs}){

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
          textDecoration: 'underline'
        },
      }));
      
        const classes = useStyles();

    let history = useHistory()
    let interestedSongCards = interestedSongs.map(song => {
        return <Grid item key={song.id}>
                <Accordion style={{ boxShadow: "none" }}  >
        <AccordionSummary  >
        <Typography className={classes.heading} > {song.title}, {song.artist} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <InterestedSongCard  userSongs={userSongs} setUserSongs={setUserSongs} setInterestedSongs={setInterestedSongs} currentUser={currentUser} song={song} />
            </>
            </AccordionDetails>
            </Accordion>

                </Grid>
    })
    function handleNavigation() {
        history.push('/newinterestedsongform')
    }
    return(
    <>
    <h2>My Interested Songs</h2>
    <Button className="gameButton" onClick={handleNavigation}>Add A New Song To Learn</Button>
    <Grid container
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-end">
    {interestedSongCards}
    </Grid>
    </>
    )
}
export default MyInterestedSongs