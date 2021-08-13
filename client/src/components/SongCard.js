import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';

function SongCard({song}){

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
          justifyContent: 'center', 
          fontWeight: 'bold', 
          margin: 'auto',
          border: 'none', 
          shadow: 'none'
        },
      }));
      
        const classes = useStyles();
      
   



    return(
  
    <Card style={{fontFamily:'Reem Kufi', alignItems:'center', flexDirection: 'column', height: '50vh', width: '75vw', overflow: 'auto'}}> 
        <Grid item container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start">
            <Grid item xs={3}>
            <h4>Title: {song.title}</h4>
            </Grid>
            <Grid item xs={6}>
            <h4>Artist: {song.artist}</h4>
                </Grid>
                <Grid item xs={3}>
            <h4>Genre: {song.genre}</h4>
                </Grid>
                <Grid item xs={3}>
            <h4>Is this a singable song? {song.singable? 'Yes': 'No'}</h4>
                </Grid>
                <Grid item xs={6}>
                    
            <h4>My Ability Level for this song: {song.my_ability_level}</h4>
                </Grid>
                <Grid item xs={3}>

            <h4>Year Learned: {song.year_learned}</h4>
                </Grid>
            <Grid item xs={12} >
                <div >

            <Accordion style={{ boxShadow: "none" }}  >
        <AccordionSummary  >
          <Typography className={classes.heading} > Click to Show Lyrics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {song.lyrics}
          </Typography>
        </AccordionDetails>
      </Accordion>
                </div>
            </Grid>
                <Grid item xs={12}>

            <h4>Notes: {song.notes}</h4>
                </Grid>
                <Grid item xs={12}>

            <h4>Recording: {song.recording}</h4>
                </Grid>

        </Grid>   
    </Card>

    )
}
export default SongCard