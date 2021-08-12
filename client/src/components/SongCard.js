import { Card, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'

function SongCard({song}){

    const Accordion = withStyles({
        heading: {
            fontFamily: 'Reem Kufi'
            },
        root: {
            fontWeight: 'bold',
            fontFamily:'Reem Kufi',
          border: 'none',
        
          boxShadow: 'none',
          '&:not(:last-child)': {
            borderBottom: 0,
          },
          '&:before': {
            display: 'none',
          },
          '&$expanded': {
            margin: 'auto',
          },
        },
        expanded: {},
      })(MuiAccordion);
      
      const AccordionSummary = withStyles({
          textAlign: 'center',
          heading: {
            fontFamily: 'Reem Kufi'
            },
        // fontFamily:'Reem Kufi',
        // root: {
        //     fontFamily:'Reem Kufi',
        //   backgroundColor: 'rgba(0, 0, 0, .03)',
        //   borderBottom: '1px solid rgba(0, 0, 0, .125)',
        //   marginBottom: -1,
        //   minHeight: 56,
        //   '&$expanded': {
        //     minHeight: 56,
        //   },
        // },
        // content: {
        //   '&$expanded': {
        //     margin: '12px 0',
        //   },
        // },
        // expanded: {},
      })(MuiAccordionSummary);
      
      const AccordionDetails = withStyles((theme) => ({
        heading: {
            fontFamily: 'Reem Kufi'
            },
        root: {
            fontWeight: 'bold',
            margin: 'auto', align: 'center',
            color: 'red',
            font:'goldman',
          padding: theme.spacing(2),
        },
      }))(MuiAccordionDetails);




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
                {/* <Grid item xs={12}>
            <h4>Lyrics: {song.lyrics}</h4>
                </Grid> */}
            <Grid item xs={12} >
            <Accordion square >
        <AccordionSummary >
          <Typography>Lyrics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {song.lyrics}
          </Typography>
        </AccordionDetails>
      </Accordion>
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